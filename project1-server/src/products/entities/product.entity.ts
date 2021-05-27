import {Column, Entity, ObjectIdColumn} from "typeorm";

@Entity({name: "products"})
export class Product {
    @ObjectIdColumn()
    _id: string;

    @Column()
    name: string;

    @Column()
    price: number;

    @Column()
    list_price: number;

    @Column()
    rating_average: number;

    @Column()
    review_count: number;

    @Column()
    image_url: string;

    @Column()
    summary_description: string;

    @Column()
    description: string;

    @Column()
    category: string;

    @Column()
    key_name: string;

    @Column()
    key_category: string;
}
