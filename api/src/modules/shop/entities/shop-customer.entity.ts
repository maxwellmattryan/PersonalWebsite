import {
    Column,
    CreateDateColumn,
    Entity,
    Index,
    OneToMany,
    PrimaryColumn,
    UpdateDateColumn
} from 'typeorm';

import { Id } from '@api/core/database/entity.service';

import { ShopOrder } from './shop-order.entity';

@Entity('shop_customer')
export class ShopCustomer {
    constructor(partial: Partial<ShopCustomer>) {
        Object.assign(this, partial);
    }

    @PrimaryColumn({ type: 'varchar' })
    public id?: Id;

    @OneToMany(type => ShopOrder, so => so.customer)
    public orders: ShopOrder[];

    @Column({ type: 'text', nullable: false, unique: true })
    @Index('email_idx')
    public email: string;

    @CreateDateColumn({ type: 'timestamp', default: () => 'now()' })
    public created_at?: Date;

    @UpdateDateColumn({ type: 'timestamp', default: () => 'now()', onUpdate: 'now()' })
    public updated_at?: Date;
}
