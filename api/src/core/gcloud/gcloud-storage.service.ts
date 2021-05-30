import { ExtendedLogger } from '@api/core/utils/extended-logger';
import { Injectable, NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { Bucket, File, GetSignedUrlConfig, Storage } from '@google-cloud/storage';

import internal from 'stream';

type BucketType = 'assets' | 'files' | 'products';

type BucketObject = {
    name: string,
    credentials: string
}

@Injectable()
export class GCloudStorageService {
    private readonly logger = new ExtendedLogger('GCloudStorageService');

    private readonly storageUrl: string = 'https://storage.googleapis.com'

    private readonly BucketObjects  = new Map<BucketType, BucketObject>([
        ['assets', {
            name: this.configService.get('GCLOUD_ASSETS_STORAGE_BUCKET'),
            credentials: this.configService.get('GCLOUD_ADMIN_CREDENTIALS')
        }],
        ['files', {
            name: this.configService.get('GCLOUD_FILES_STORAGE_BUCKET'),
            credentials: this.configService.get('GCLOUD_ADMIN_CREDENTIALS')
        }],
        ['products', {
            name: this.configService.get('GCLOUD_PRODUCTS_STORAGE_BUCKET'),
            credentials: this.configService.get('GCLOUD_CUSTOMER_CREDENTIALS')
        }],
    ]);

    constructor(
        private readonly configService: ConfigService
    ) { }

    public async getSignedUrl(bucketType: BucketType, filename: string): Promise<string> {
        const bucket: Bucket = this.getBucket(bucketType);
        const blob = bucket.file(filename);

        const signedUrl = (await blob.getSignedUrl(this.signedUrlOptions())).toString();

        this.logger.info(`Generated signed URL for resource: ${filename}`);

        return signedUrl;
    }

    public async getSignedUrls(bucketType: BucketType, filenames: string[]): Promise<string[]> {
        const bucket: Bucket = this.getBucket(bucketType);
        const signedUrlOptions = this.signedUrlOptions();

        let signedUrls: string[] = [];
        for(const filename of filenames) {
            const [signedUrl] = await bucket.file(filename).getSignedUrl(signedUrlOptions);
            signedUrls.push(signedUrl);
        }

        this.logger.info(`Generated ${signedUrls.length} signed URL(s) for resource(s): ${filenames.join(', ')}`);

        return signedUrls;
    }

    private signedUrlOptions(duration: number = 12): GetSignedUrlConfig {
        return {
            action: 'read',
            expires: Date.now() + duration * 60 * 60 * 1000 // NOTE: h * m * s * ms
        }
    }

    public uploadFile(file: Express.Multer.File, directory: string): string {
        const { originalname, buffer } = file;
        const uri: string = `${directory}/${originalname.replace(/ /g, '-')}`;

        const bucket: Bucket = this.getBucket('assets');
        const blob: File = bucket.file(uri);
        const stream: internal.Writable = blob.createWriteStream({
            gzip: true,
            resumable: false
        });
        stream
            .on('finish', () => {
                return Promise.resolve(`${this.storageUrl}/${bucket.name}/${blob.name}`);
            })
            .on('error', () => {
                return Promise.reject('Unable to upload file to Cloud Storage.')
            })
            .end(buffer);

        this.logger.info(`Uploaded file of URI: ${directory}/${originalname}`);

        return `${this.storageUrl}/${bucket.name}/${blob.name}`;
    }

    public deleteFile(uri: string): Promise<any> {
        const bucket: Bucket = this.getBucket('assets');
        const blob: File = bucket.file(uri);

        return blob.delete()
            .then(() => {
                this.logger.info(`Deleted file of URI: ${blob.name}`)
            })
            .catch((error) => {
                throw new NotFoundException(error.errors[0].message);
            });
    }

    private getBucket(bucketType: BucketType): Bucket {
        const { name, credentials } = this.BucketObjects.get(bucketType);
        const storage = new Storage({
            credentials: JSON.parse(Buffer.from(credentials, 'base64').toString())
        })

        return storage.bucket(name);
    }
}