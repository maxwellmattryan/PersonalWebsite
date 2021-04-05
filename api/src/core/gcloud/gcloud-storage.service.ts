import { ExtendedLogger } from '@api/core/utils/extended-logger';
import { Injectable, NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { Bucket, File, GetSignedUrlConfig, Storage } from '@google-cloud/storage';

import internal from 'stream';

type ApiStorageBucket = 'assets' | 'products';

@Injectable()
export class GCloudStorageService {
    private readonly logger = new ExtendedLogger('GCloudStorageService');

    private readonly storage: Storage;
    private readonly storageUrl: string = 'https://storage.googleapis.com'

    private readonly ApiStorageBuckets  = new Map<ApiStorageBucket, string>([
        ['assets', this.configService.get('GCLOUD_ASSETS_STORAGE_BUCKET')],
        ['products', this.configService.get('GCLOUD_PRODUCTS_STORAGE_BUCKET')]
    ]);

    constructor(
        private readonly configService: ConfigService
    ) {
        const credentials = Buffer.from(this.configService.get<string>('GCLOUD_CREDENTIALS'), 'base64').toString();
        this.storage = new Storage({
            credentials: JSON.parse(credentials)
        });
    }

    public async getSignedUrl(bucketName: ApiStorageBucket, filename: string): Promise<string> {
        const bucket: Bucket = this.getBucket(bucketName);
        const blob = bucket.file(filename);

        const signedUrl = (await blob.getSignedUrl(this.signedUrlOptions())).toString();

        this.logger.info(`Generated signed URL for resource: ${filename}`);

        return signedUrl;
    }

    public async getSignedUrls(bucketname: ApiStorageBucket, filenames: string[]): Promise<string[]> {
        const bucket: Bucket = this.getBucket(bucketname);
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

    private getBucket(bucketName: ApiStorageBucket): Bucket {
        return this.storage.bucket(this.ApiStorageBuckets.get(bucketName));
    }
}