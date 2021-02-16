import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

import { ShopProduct } from '../entities/shop-product.entity';

@Entity('shop_product_status')
export class ShopProductStatus {
    constructor(partial: Partial<ShopProductStatus>) {
        Object.assign(this, partial);
    }

    @PrimaryGeneratedColumn()
    public id: number;

    @OneToMany(type => ShopProduct, sp => sp.status)
    public products: ShopProduct[];

    @Column({ type: 'varchar', length: 50, nullable: false, unique: true })
    public status: string;

    @CreateDateColumn({ type: 'timestamp', default: () => 'now()' })
    public created_at?: Date;

    @UpdateDateColumn({ type: 'timestamp', default: () => 'now()', onUpdate: 'now()' })
    public updated_at?: Date;
}
