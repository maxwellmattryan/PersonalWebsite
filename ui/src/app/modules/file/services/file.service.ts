import { Injectable } from "@angular/core";
import { Bucket, BucketVisibility } from "@ui/modules/file/file.type";

@Injectable({
    providedIn: 'root'
})
export class FileService {
    getBucketName(bucket: Bucket): string {
        return `mattmaxwell-${bucket.charAt(0).toLowerCase()}${bucket.slice(1)}`;
    }

    getBucketVisibility(visibility: BucketVisibility): string {
        return `${visibility.charAt(0).toLowerCase()}${visibility.slice(1)}`;
    }
}
