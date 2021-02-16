import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { ShopCategory } from '@api/modules/shop/entities/shop-category.entity';

@Entity('shop_product')
export class ShopProduct {
    constructor(partial: Partial<ShopProduct>) {
        Object.assign(this, partial);
    }

    @PrimaryGeneratedColumn()
    public id: number;

    @ManyToOne(type => ShopCategory, sc => sc.products)
    public category: ShopCategory;

    @Column({ type: 'varchar', length: 50, nullable: false, unique: true })
    public name: string;

    @Column({ type: 'decimal', nullable: false })
    public amount: number;

    @Column({ type: 'text', nullable: false })
    public description: string;

    @Column({ type: 'text', nullable: false })
    public image_url: string;

    @CreateDateColumn({ type: 'timestamp', default: () => 'now()' })
    public created_at?: Date;

    @UpdateDateColumn({ type: 'timestamp', default: () => 'now()', onUpdate: 'now()' })
    public updated_at?: Date;
}
