import { Id } from '@api/core/database/entity.service';

export interface TokenPayload {
    id: Id;
    username: string;
}