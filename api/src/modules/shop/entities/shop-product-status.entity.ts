import {
    Column,
    CreateDateColumn,
    Entity,
    OneToMany,
    PrimaryColumn,
    UpdateDateColumn
} from 'typeorm';

import { Id } from "@api/core/database/entity.service";

import { ShopProduct } from '../entities/shop-product.entity';

@Entity('shop_product_status')
export class ShopProductStatus {
    constructor(partial: Partial<ShopProductStatus>) {
        Object.assign(this, partial);
    }

    @PrimaryColumn({ type: 'varchar' })
    public id?: Id;

    @OneToMany(type => ShopProduct, sp => sp.status)
    public products: ShopProduct[];

    @Column({ type: 'varchar', length: 50, nullable: false, unique: true })
    public status: string;

    @CreateDateColumn({ type: 'timestamp', default: () => 'now()' })
    public created_at?: Date;

    @UpdateDateColumn({ type: 'timestamp', default: () => 'now()', onUpdate: 'now()' })
    public updated_at?: Date;
}

export enum ShopProductStatuses {
    AVAILABLE =     'AVAILABLE',
    UNAVAILABLE =   'UNAVAILABLE',
    DISCONTINUED =  'DISCONTINUED',
    REMOVED =       'REMOVED'
}
