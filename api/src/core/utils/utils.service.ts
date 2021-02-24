import { Injectable } from '@nestjs/common';

@Injectable()
export class UtilsService {
    constructor() { }

    public zip(arr1: any[], arr2: any[]): any[] {
        return arr1.map((val, idx, arr) => {
            return [val, arr2[idx]];
        });
    }
}