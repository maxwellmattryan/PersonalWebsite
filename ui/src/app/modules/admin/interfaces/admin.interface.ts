import { Id } from '@ui/core/models/model';

export interface Admin {
    id?: Id;
    username: string;
    password?: string;
}
