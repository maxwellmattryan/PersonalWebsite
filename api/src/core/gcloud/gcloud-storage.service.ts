import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { Bucket, GetSignedUrlConfig, Storage } from '@google-cloud/storage';

type ApiStorageBucket = 'assets' | 'products';

@Injectable()
export class GCloudStorageService {
    private readonly credentials: string;
    private readonly storage: Storage;
    private readonly storageUrl: string = 'https://storage.googleapis.com'

    private readonly ApiStorageBuckets  = new Map<ApiStorageBucket, string>([
        ['assets', this.configService.get('GCLOUD_ASSETS_STORAGE_BUCKET')],
        ['products', this.configService.get('GCLOUD_PRODUCTS_STORAGE_BUCKET')]
    ]);

    constructor(
        private readonly configService: ConfigService
    ) {
        this.credentials = Buffer.from(this.configService.get<string>('GCLOUD_CREDENTIALS'), 'base64').toString();
        this.storage = new Storage({
            credentials: JSON.parse(this.credentials)
        });
    }

    public async getSignedUrl(bucketName: ApiStorageBucket, filename: string): Promise<string> {
        const bucket: Bucket = this.getBucket(bucketName);

        return (await bucket.file(filename).getSignedUrl(this.signedUrlOptions())).toString();
    }

    public async getSignedUrls(bucketname: ApiStorageBucket, filenames: string[]): Promise<string[]> {
        const bucket: Bucket = this.getBucket(bucketname);
        const signedUrlOptions = this.signedUrlOptions();

        let signedUrls: string[] = [];
        for(const filename of filenames) {
            const [signedUrl] = await bucket.file(filename).getSignedUrl(signedUrlOptions);
            signedUrls.push(signedUrl);
        }

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
        const filePath: string = `${directory}/${originalname.replace(/ /g, '-')}`;

        const bucket = this.getBucket('assets');
        const blob = bucket.file(filePath);
        const stream = blob.createWriteStream({
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

        return `${this.storageUrl}/${bucket.name}/${blob.name}`;
    }

    private getBucket(bucketName: ApiStorageBucket): Bucket {
        return this.storage.bucket(this.ApiStorageBuckets.get(bucketName));
    }
}