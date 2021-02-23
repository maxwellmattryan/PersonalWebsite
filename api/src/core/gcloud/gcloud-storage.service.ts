import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { Bucket, Storage } from '@google-cloud/storage';

@Injectable()
export class GCloudStorageService {
    private readonly credentials: string;
    private readonly storage: Storage;
    private readonly bucket: Bucket;

    constructor(
        private readonly configService: ConfigService
    ) {
        this.credentials = Buffer.from(this.configService.get<string>('GCLOUD_CREDENTIALS'), 'base64').toString();
        this.storage = new Storage({
            credentials: JSON.parse(this.credentials)
        });

        const bucketName = this.configService.get('GCLOUD_STORAGE_BUCKET');
        this.bucket = this.storage.bucket(bucketName);
    }

    public getBucket(): Bucket {
        return this.bucket;
    }
}