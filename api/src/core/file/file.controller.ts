import { Controller, Get, HttpCode, Param, Query, Req, Res } from '@nestjs/common';

import { Request, Response } from 'express';

export type File = any;

@Controller('file')
export class FileController {
    constructor() { }

    @Get()
    @HttpCode(200)
    public async getFile(@Query() query, @Req() request: Request, @Res() response: Response): Promise<File> {
        return response.sendFile(query.uri, { root: 'assets' });
    }
}
