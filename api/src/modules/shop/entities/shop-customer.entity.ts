import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('shop_customer')
export class ShopCustomer {
    constructor(partial: Partial<ShopCustomer>) {
        Object.assign(this, partial);
    }

    @PrimaryGeneratedColumn()
    public id: number;

    @Column({ type: 'text', nullable: false, unique: true })
    public email: string;

    @Column({ type: 'varchar', length: 50, nullable: false })
    public name: string;
}
