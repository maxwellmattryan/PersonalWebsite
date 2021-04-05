import { GCloudStorageService } from '@api/core/gcloud/gcloud-storage.service';
import { Request } from 'express';
declare type FileResponse = {
    [url: string]: string;
};
export declare class FileController {
    private readonly gCloudStorageService;
    private uriRegex;
    constructor(gCloudStorageService: GCloudStorageService);
    uploadFile(file: Express.Multer.File, directory: string, request: Request): Promise<FileResponse>;
    deleteFile(uri: string, request: Request): Promise<void>;
}
export {};
