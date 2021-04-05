import { Id } from '@api/core/database/entity.service';
export declare class Admin {
    constructor(partial: Partial<Admin>);
    id?: Id;
    username: string;
    password: string;
}
