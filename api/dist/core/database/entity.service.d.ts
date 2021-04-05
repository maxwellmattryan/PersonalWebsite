export declare type Digest = 'base64' | 'hex';
export declare type HashAlgorithm = 'sha256' | 'md5' | 'RSA-SHA256';
export declare type Id = string | number;
export declare class EntityService<T> {
    private digest;
    private hashAlgorithm;
    createEntity(entityData: T, uniqueProperties: string[]): T;
    private createStringHashId;
    private generateRandomIdChar;
    private getRandomInt;
}
