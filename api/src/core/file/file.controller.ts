import { Controller, Get, HttpCode, Param, Post, Query, Req, Res } from '@nestjs/common';

import { Request, Response } from 'express';

export type File = any;

@Controller('files')
export class FileController {
    constructor() { }

    @Get()
    @HttpCode(200)
    public async getFile(@Query('uri') uri, @Req() request: Request, @Res() response: Response): Promise<File> {
        return response.sendFile(uri, { root: 'assets' });
    }

    @Post('upload')
    @HttpCode(201)
    public async (@Query('uri') uri, @Req() request: Request, @Res() response: Response): Promise<void> {
        console.log(uri);

        return;
    }
}
