import {
    Column,
    CreateDateColumn,
    Entity,
    ManyToOne,
    OneToMany,
    PrimaryColumn,
    UpdateDateColumn
} from 'typeorm';

import { Id } from '@api/core/database/entity.service';

import { ShopCategory } from '../entities/shop-category.entity';
import { ShopProductStatus } from '../entities/shop-product-status.entity';
import { ShopOrder } from './shop-order.entity';

@Entity('shop_product')
export class ShopProduct {
    constructor(partial: Partial<ShopProduct>) {
        Object.assign(this, partial);
    }

    @PrimaryColumn({ type: 'varchar', length: 6 })
    public id?: Id;

    @OneToMany(type => ShopOrder, so => so.product)
    public orders: ShopOrder[];

    @ManyToOne(type => ShopProductStatus, sps => sps.products, { nullable: false })
    public status: ShopProductStatus;

    @ManyToOne(type => ShopCategory, sc => sc.products, { nullable: false })
    public category: ShopCategory;

    @Column({ type: 'varchar', length: 50, nullable: false, unique: true })
    public name: string;

    @Column({ type: 'varchar', nullable: false, unique: true })
    public filename: string;

    @Column({ type: 'decimal', nullable: false })
    public amount: number;

    @Column({ type: 'text', nullable: false })
    public preview: string;

    @Column({ type: 'text', nullable: false })
    public description: string;

    @Column({ type: 'text', nullable: false })
    public image_url: string;

    @CreateDateColumn({ type: 'timestamp', default: () => 'now()' })
    public created_at?: Date;

    @UpdateDateColumn({ type: 'timestamp', default: () => 'now()', onUpdate: 'now()' })
    public updated_at?: Date;
}
