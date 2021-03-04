import { Injectable } from '@nestjs/common';

import { createHash } from 'crypto';

export type Digest = 'base64' | 'hex';
export type Id = 'string' | 'number';
export type HashAlgorithm = 'sha256' | 'md5' | 'RSA-SHA256';

@Injectable()
export class EntityService<T> {
    private hashAlgorithm: HashAlgorithm = 'sha256';
    private digest: Digest = 'base64';

    public createStringHashId(identifier: string | number | Date, length = 6): Id {
        const now: string = new Date().toString();

        return <Id>createHash(this.hashAlgorithm)
            .update(identifier + now)
            .digest(this.digest)
            .toString()
            .replace(/[^A-Z0-9]/g, this.generateRandomIdChar)
            .slice(0, length);
    }

    private generateRandomIdChar = (): string => {
        const randChars: string[] = [
            String.fromCharCode(this.getRandomInt(26) + 65),    // A-Z
            String.fromCharCode(this.getRandomInt(10) + 48)     // 0-9
        ];

        return randChars[this.getRandomInt(randChars.length)];
    }

    private getRandomInt(n: number): number {
        return Math.floor(Math.random() * Math.floor(n));
    }
}
