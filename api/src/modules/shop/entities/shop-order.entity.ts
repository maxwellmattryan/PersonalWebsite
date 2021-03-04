import {
    Column,
    CreateDateColumn,
    Entity,
    ManyToOne,
    PrimaryColumn,
    UpdateDateColumn
} from 'typeorm';

import { Id } from '@api/core/database/entity.service';

import { ShopCustomer } from './shop-customer.entity';
import { ShopProduct } from './shop-product.entity';

@Entity('shop_order')
export class ShopOrder {
    constructor(partial: Partial<ShopOrder>) {
        Object.assign(this, partial);
    }

    @PrimaryColumn({ type: 'varchar' })
    public id?: Id;

    @ManyToOne(type => ShopCustomer, sc => sc.orders, { nullable: false })
    public customer: ShopCustomer;

    @ManyToOne(type => ShopProduct, sp => sp.orders, { nullable: false })
    public product: ShopProduct;

    @Column({ type: 'decimal', nullable: false })
    public amount: number;

    @Column({ type: 'boolean', nullable: false, default: false })
    public has_sent_email: boolean;

    @CreateDateColumn({ type: 'timestamp', default: () => 'now()' })
    public created_at?: Date;

    @UpdateDateColumn({ type: 'timestamp', default: () => 'now()', onUpdate: 'now()' })
    public updated_at?: Date;
}
