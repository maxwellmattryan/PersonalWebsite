import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

import { ShopCategory } from '../entities/shop-category.entity';
import { ShopProductStatus } from '../entities/shop-product-status.entity';

@Entity('shop_product')
export class ShopProduct {
    constructor(partial: Partial<ShopProduct>) {
        Object.assign(this, partial);
    }

    @PrimaryGeneratedColumn()
    public id: number;

    @ManyToOne(type => ShopProductStatus, sps => sps.products, { nullable: false })
    public status: ShopProductStatus;

    @ManyToOne(type => ShopCategory, sc => sc.products, { nullable: false })
    public category: ShopCategory;

    @Column({ type: 'varchar', length: 50, nullable: false, unique: true })
    public name: string;

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
