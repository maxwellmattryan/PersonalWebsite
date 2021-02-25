import { Controller, Get, HttpCode, Param, Req, Res } from '@nestjs/common';

export type File = any;

@Controller('file')
export class FileController {
    constructor() { }

    @Get(':path')
    @HttpCode(200)
    public async getFile(@Param('path') path: string, @Req() request: Request, @Res() response: Response): Promise<File> {
        console.log(path);
    }
}
