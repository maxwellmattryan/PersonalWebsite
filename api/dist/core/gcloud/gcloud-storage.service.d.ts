import { ConfigService } from '@nestjs/config';
declare type ApiStorageBucket = 'assets' | 'products';
export declare class GCloudStorageService {
    private readonly configService;
    private readonly logger;
    private readonly storage;
    private readonly storageUrl;
    private readonly ApiStorageBuckets;
    constructor(configService: ConfigService);
    getSignedUrl(bucketName: ApiStorageBucket, filename: string): Promise<string>;
    getSignedUrls(bucketname: ApiStorageBucket, filenames: string[]): Promise<string[]>;
    private signedUrlOptions;
    uploadFile(file: Express.Multer.File, directory: string): string;
    deleteFile(uri: string): Promise<any>;
    private getBucket;
}
export {};
