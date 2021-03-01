import {
    Controller,
    Delete,
    Get,
    HttpCode,
    Post,
    Query,
    Req,
    Res,
    UploadedFile,
    UseGuards,
    UseInterceptors
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';

import { Request, Response } from 'express';
import { diskStorage } from 'multer';
import { CannotDeleteFolderException, FileWasNotFoundException, InvalidFileUriException } from './file.exception';
import { JwtAuthGuard } from '@api/core/auth/jwt/jwt-auth.guard';

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
    private uriRegex: RegExp = /^(?!\/)(?!.*(?:^|\/)\.\.\/).+/;

    constructor() { }

    @Get()
    @HttpCode(200)
    public async getFile(@Query('uri') uri, @Req() request: Request, @Res() response: Response): Promise<File> {
        if(!fs.existsSync(`files/${uri}`))
            throw new FileWasNotFoundException();

        return response.sendFile(uri, { root: 'files' });
    }

    @Post('upload')
    @HttpCode(201)
    @UseGuards(JwtAuthGuard)
    @UseInterceptors(FileInterceptor('file', StorageOptions()))
    public async uploadFile(
        @UploadedFile() file: Express.Multer.File,
        @Query('folder') folder: string,
        @Req() request: Request
    ): Promise<void> {
        if(!this.uriRegex.test(folder)) throw new InvalidFileUriException();

        return;
    }

    @Delete('delete')
    @HttpCode(204)
    @UseGuards(JwtAuthGuard)
    public async deleteFile(@Query('uri') uri: string, @Req() request: Request): Promise<void> {
        if(!this.uriRegex.test(uri)) throw new InvalidFileUriException();

        const fullUri: string = `files/${uri}`;
        if(fs.existsSync(fullUri)) {
            try {
                fs.unlinkSync(fullUri);
            } catch(err) {
                throw new CannotDeleteFolderException();
            }
        }
        else
            throw new FileWasNotFoundException();

        return;
    }
}
