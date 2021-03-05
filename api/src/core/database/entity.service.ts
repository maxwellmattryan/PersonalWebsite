import { Injectable } from '@nestjs/common';

import { createHash } from 'crypto';

import { InvalidEntityPropertyException } from "./entity.exception";

export type Digest = 'base64' | 'hex';
export type HashAlgorithm = 'sha256' | 'md5' | 'RSA-SHA256';

export type Id = string | number;

@Injectable()
export class EntityService<T> {
    private digest: Digest = 'base64';
    private hashAlgorithm: HashAlgorithm = 'sha256';

    public createEntity(entityData: T, uniqueProperties: string[]): T {
        uniqueProperties.forEach(p => {
            if(!entityData[p]) {
                console.log(entityData);
                console.log(p);
                throw new InvalidEntityPropertyException();
            }
        });

        const identifier: string = uniqueProperties.map(p => entityData[p]).join(' ');

        return {
            ...entityData,
            id: this.createStringHashId(identifier)
        };
    }

    private createStringHashId(identifier: string | number | Date, length = 6): Id {
        const now: string = new Date().toString();

        return <Id>createHash(this.hashAlgorithm)
            .update(identifier + now + this.getRandomInt(1_000_000))
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
