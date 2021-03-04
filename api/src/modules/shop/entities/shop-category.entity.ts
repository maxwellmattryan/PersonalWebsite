import {
    Column,
    CreateDateColumn,
    Entity,
    OneToMany,
    PrimaryColumn,
    UpdateDateColumn
} from 'typeorm';

import { Id } from "@api/core/database/entity.service";

import { ShopProduct } from './shop-product.entity';

@Entity('shop_category')
export class ShopCategory {
    constructor(partial: Partial<ShopCategory>) {
        Object.assign(this, partial);
    }

    @PrimaryColumn({ type: 'varchar' })
    public id?: Id;

    @OneToMany(type => ShopProduct, sp => sp.category)
    public products: ShopProduct[];

    @Column({ type: 'varchar', length: 50, nullable: false, unique: true })
    public name: string;

    @CreateDateColumn({ type: 'timestamp', default: () => 'now()' })
    public created_at?: Date;

    @UpdateDateColumn({ type: 'timestamp', default: () => 'now()', onUpdate: 'now()' })
    public updated_at?: Date;
}
