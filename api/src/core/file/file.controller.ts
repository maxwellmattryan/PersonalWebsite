import { Controller, Get, HttpCode, Param, Post, Query, Req, Res, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';

import { Request, Response } from 'express';
import { diskStorage } from 'multer';
import { InvalidFileUriException } from './file.exception';

const fs = require('fs');

export type File = any;

export const DiskStorage = () => diskStorage({
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    },
    destination: (req, file, cb) => {
        const uri: string = 'files/' + req.query.folder.toString() || '';

        if(!fs.existsSync(uri)) {
            fs.mkdirSync(uri, { recursive: true })
        }

        cb(null,  uri);
    }
});

export const StorageOptions = () => {
    return {
        dest: './files',
        storage: DiskStorage()
    }
};

@Controller('files')
export class FileController {
    constructor() { }

    @Get()
    @HttpCode(200)
    public async getFile(@Query('uri') uri, @Req() request: Request, @Res() response: Response): Promise<File> {
        return response.sendFile(uri, { root: 'files' });
    }

    @Post('upload')
    @HttpCode(201)
    @UseInterceptors(FileInterceptor('file', StorageOptions()))
    public async uploadFile(
        @UploadedFile() file: Express.Multer.File,
        @Query('folder') folder,
        @Req() request: Request
    ): Promise<void> {
        const pathRegex: RegExp = /^(?!\/)(?!.*(?:^|\/)\.\.\/).+/;
        if(!pathRegex.test(folder)) throw new InvalidFileUriException();

        return;
    }
}
