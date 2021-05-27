import {Column, Entity} from "typeorm";
import {Cart} from "../../carts/entities/cart.entity";

@Entity({name: 'orders'})
export class Order extends Cart {
    @Column()
    orderedDate: Date;
}
