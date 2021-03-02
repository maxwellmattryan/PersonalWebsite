import { Injectable } from '@nestjs/common';

import * as c from 'crypto';

export type HashAlgorithm = 'sha256' | 'md5' | 'RSA-SHA256';
export type Digest = 'base64' | 'hex';

@Injectable()
export class EntityService<T> {
    private hashAlgorithm: HashAlgorithm = 'sha256';
    private digest: Digest = 'base64';

    constructor() { }

    public createId(identifier: any): number {
        const now: string = new Date().toString();
        let hash = c.createHash(this.hashAlgorithm).update(identifier + now).digest(this.digest).toString();

        hash = hash.replace(/\D/g, '');

        return Number(hash);
    }
}
