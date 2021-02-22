import {
    Column,
    CreateDateColumn,
    Entity,
    ManyToOne,
    PrimaryColumn,
    PrimaryGeneratedColumn,
    UpdateDateColumn
} from 'typeorm';

import { ShopCustomer } from './shop-customer.entity';
import { ShopProduct } from './shop-product.entity';

@Entity('shop_order')
export class ShopOrder {
    constructor(partial: Partial<ShopOrder>) {
        Object.assign(this, partial);
    }

    @PrimaryGeneratedColumn()
    public id: number;

    @ManyToOne(type => ShopCustomer, sc => sc.orders, { nullable: false })
    public customer: ShopCustomer;

    @ManyToOne(type => ShopProduct, sp => sp.orders, { nullable: false })
    public product: ShopProduct;

    @Column({ type: 'decimal', nullable: false })
    public amount: number;

    @CreateDateColumn({ type: 'timestamp', default: () => 'now()' })
    public created_at?: Date;

    @UpdateDateColumn({ type: 'timestamp', default: () => 'now()', onUpdate: 'now()' })
    public updated_at?: Date;
}
