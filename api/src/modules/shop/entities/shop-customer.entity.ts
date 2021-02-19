import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { ShopOrder } from './shop-order.entity';

@Entity('shop_customer')
export class ShopCustomer {
    constructor(partial: Partial<ShopCustomer>) {
        Object.assign(this, partial);
    }

    @PrimaryGeneratedColumn()
    public id: number;

    @OneToMany(type => ShopOrder, so => so.customer)
    public orders: ShopOrder[];

    @Column({ type: 'text', nullable: false, unique: true })
    public email: string;

    @Column({ type: 'varchar', length: 50, nullable: false })
    public name: string;

    @CreateDateColumn({ type: 'timestamp', default: () => 'now()' })
    public created_at?: Date;

    @UpdateDateColumn({ type: 'timestamp', default: () => 'now()', onUpdate: 'now()' })
    public updated_at?: Date;
}
