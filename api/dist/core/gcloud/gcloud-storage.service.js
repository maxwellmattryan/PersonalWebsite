"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GCloudStorageService = void 0;
const extended_logger_1 = require("../utils/extended-logger");
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const storage_1 = require("@google-cloud/storage");
let GCloudStorageService = class GCloudStorageService {
    constructor(configService) {
        this.configService = configService;
        this.logger = new extended_logger_1.ExtendedLogger('GCloudStorageService');
        this.storageUrl = 'https://storage.googleapis.com';
        this.ApiStorageBuckets = new Map([
            ['assets', this.configService.get('GCLOUD_ASSETS_STORAGE_BUCKET')],
            ['products', this.configService.get('GCLOUD_PRODUCTS_STORAGE_BUCKET')]
        ]);
        const credentials = Buffer.from(this.configService.get('GCLOUD_CREDENTIALS'), 'base64').toString();
        this.storage = new storage_1.Storage({
            credentials: JSON.parse(credentials)
        });
    }
    async getSignedUrl(bucketName, filename) {
        const bucket = this.getBucket(bucketName);
        const blob = bucket.file(filename);
        const signedUrl = (await blob.getSignedUrl(this.signedUrlOptions())).toString();
        this.logger.info(`Generated signed URL for resource: ${filename}`);
        return signedUrl;
    }
    async getSignedUrls(bucketname, filenames) {
        const bucket = this.getBucket(bucketname);
        const signedUrlOptions = this.signedUrlOptions();
        let signedUrls = [];
        for (const filename of filenames) {
            const [signedUrl] = await bucket.file(filename).getSignedUrl(signedUrlOptions);
            signedUrls.push(signedUrl);
        }
        this.logger.info(`Generated ${signedUrls.length} signed URL(s) for resource(s): ${filenames.join(', ')}`);
        return signedUrls;
    }
    signedUrlOptions(duration = 12) {
        return {
            action: 'read',
            expires: Date.now() + duration * 60 * 60 * 1000
        };
    }
    uploadFile(file, directory) {
        const { originalname, buffer } = file;
        const uri = `${directory}/${originalname.replace(/ /g, '-')}`;
        const bucket = this.getBucket('assets');
        const blob = bucket.file(uri);
        const stream = blob.createWriteStream({
            gzip: true,
            resumable: false
        });
        stream
            .on('finish', () => {
            return Promise.resolve(`${this.storageUrl}/${bucket.name}/${blob.name}`);
        })
            .on('error', () => {
            return Promise.reject('Unable to upload file to Cloud Storage.');
        })
            .end(buffer);
        this.logger.info(`Uploaded file of URI: ${directory}/${originalname}`);
        return `${this.storageUrl}/${bucket.name}/${blob.name}`;
    }
    deleteFile(uri) {
        const bucket = this.getBucket('assets');
        const blob = bucket.file(uri);
        return blob.delete()
            .then(() => {
            this.logger.info(`Deleted file of URI: ${blob.name}`);
        })
            .catch((error) => {
            throw new common_1.NotFoundException(error.errors[0].message);
        });
    }
    getBucket(bucketName) {
        return this.storage.bucket(this.ApiStorageBuckets.get(bucketName));
    }
};
GCloudStorageService = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [config_1.ConfigService])
], GCloudStorageService);
exports.GCloudStorageService = GCloudStorageService;
//# sourceMappingURL=gcloud-storage.service.js.map