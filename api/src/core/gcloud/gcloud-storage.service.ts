import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { Bucket, File, GetSignedUrlConfig, GetSignedUrlResponse, Storage } from '@google-cloud/storage';

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
        this.bucket = this.storage.bucket(this.configService.get('GCLOUD_STORAGE_BUCKET'));
    }

    public async getSignedUrl(filename: string): Promise<string> {
        return (await this.bucket.file(filename).getSignedUrl(this.signedUrlOptions())).toString();
    }

    public async getSignedUrls(filenames: string[]): Promise<string[]> {
        const signedUrlOptions = this.signedUrlOptions();

        let signedUrls: string[] = [];
        for(const filename of filenames) {
            const [signedUrl] = await this.bucket.file(filename).getSignedUrl(signedUrlOptions);
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
}