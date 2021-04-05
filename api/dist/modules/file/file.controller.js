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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FileController = void 0;
const gcloud_storage_service_1 = require("../../core/gcloud/gcloud-storage.service");
const common_1 = require("@nestjs/common");
const platform_express_1 = require("@nestjs/platform-express");
const jwt_auth_guard_1 = require("../../core/auth/jwt/jwt-auth.guard");
const file_exception_1 = require("./file.exception");
const fs = require('fs');
let FileController = class FileController {
    constructor(gCloudStorageService) {
        this.gCloudStorageService = gCloudStorageService;
        this.uriRegex = /^(?!\/)(?!.*(?:^|\/)\.\.\/).+/;
    }
    async uploadFile(file, directory, request) {
        if (!this.uriRegex.test(directory))
            throw new file_exception_1.InvalidFileUriException();
        return { url: this.gCloudStorageService.uploadFile(file, directory) };
    }
    async deleteFile(uri, request) {
        if (!this.uriRegex.test(uri))
            throw new file_exception_1.InvalidFileUriException();
        await this.gCloudStorageService.deleteFile(uri);
    }
};
__decorate([
    common_1.Post('upload'),
    common_1.HttpCode(201),
    common_1.UseGuards(jwt_auth_guard_1.JwtAuthGuard),
    common_1.UseInterceptors(platform_express_1.FileInterceptor('file')),
    __param(0, common_1.UploadedFile()),
    __param(1, common_1.Query('dir')),
    __param(2, common_1.Req()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, Object]),
    __metadata("design:returntype", Promise)
], FileController.prototype, "uploadFile", null);
__decorate([
    common_1.Delete('delete'),
    common_1.HttpCode(204),
    common_1.UseGuards(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, common_1.Query('uri')), __param(1, common_1.Req()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], FileController.prototype, "deleteFile", null);
FileController = __decorate([
    common_1.Controller('files'),
    __metadata("design:paramtypes", [gcloud_storage_service_1.GCloudStorageService])
], FileController);
exports.FileController = FileController;
//# sourceMappingURL=file.controller.js.map