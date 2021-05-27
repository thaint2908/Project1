import {Column, Entity, ObjectIdColumn} from "typeorm";

@Entity({name: "roles"})
export class Role {
    @ObjectIdColumn()
    _id: number;

    @Column()
    name: string;
}
