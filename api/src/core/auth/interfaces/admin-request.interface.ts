import { Request } from 'express';

import { Admin } from '@api/features/admin/admin.entity';

export interface AdminRequest extends Request {
    admin: Admin;
}