import {Column, Entity, ObjectIdColumn} from "typeorm";
import {Item} from "../../items/entities/item.entity";
import {User} from "../../users/entities/user.entity";
import {Status} from "../../shared/enums/status.enum";

@Entity({name: 'carts'})
export class Cart {
    @ObjectIdColumn()
    _id: string;

    @Column()
    items: Item[];

    @Column()
    totalPrice: number;

    @Column(type => User)
    user: User;

    @Column({
        type: 'enum',
        enum: Status,
        default: Status.PENDING
    })
    status: Status;
}
