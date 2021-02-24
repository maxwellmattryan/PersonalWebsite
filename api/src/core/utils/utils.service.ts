import { Injectable } from '@nestjs/common';

@Injectable()
export class UtilsService {
    constructor() { }

    public pad(n: number | string, amount: number = 5): string {
        return String(n).padStart(amount, '0');
    }

    public zip(arr1: any[], arr2: any[]): any[] {
        return arr1.map((val, idx, arr) => {
            return [val, arr2[idx]];
        });
    }
}