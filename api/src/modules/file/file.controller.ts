import { GCloudStorageService } from '@api/core/gcloud/gcloud-storage.service';
import {
    Controller,
    Delete,
    Get,
    HttpCode, HttpStatus,
    Post,
    Query,
    Req,
    UploadedFile,
    UseGuards, UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';

import { Request, Express } from 'express';
import { Multer } from 'multer';

import { JwtAuthGuard } from '@api/core/auth/jwt/jwt-auth.guard';

import { CannotDeleteFolderException, FileWasNotFoundException, InvalidFileUriException } from './file.exception';

const fs = require('fs');

type FileResponse = {
    [url: string]: string
};

@Controller('files')
export class FileController {
    private uriRegex: RegExp = /^(?!\/)(?!.*(?:^|\/)\.\.\/).+/;

    constructor(private readonly gCloudStorageService: GCloudStorageService) { }

    @Post('upload')
    @HttpCode(HttpStatus.CREATED)
    @UseGuards(JwtAuthGuard)
    @UseInterceptors(FileInterceptor('file'))
    public async uploadFile(
        @UploadedFile() file: Express.Multer.File,
        @Query('dir') directory: string,
        @Req() request: Request
    ): Promise<FileResponse> {
        if(!this.uriRegex.test(directory)) throw new InvalidFileUriException();

        return { url: this.gCloudStorageService.uploadFile(file, directory) };
    }

    @Delete('delete')
    @HttpCode(HttpStatus.NO_CONTENT)
    @UseGuards(JwtAuthGuard)
    public async deleteFile(@Query('uri') uri: string, @Req() request: Request): Promise<void> {
        if(!this.uriRegex.test(uri)) throw new InvalidFileUriException();

        await this.gCloudStorageService.deleteFile(uri);
    }
}
