import {Role} from "./role.entity";
import {Column, Entity, ObjectIdColumn} from "typeorm";

@Entity({name: "users"})
export class User {
    @ObjectIdColumn()
    _id: string;

    @Column()
    username: string;

    @Column()
    email: string;

    @Column()
    firebaseUid: string;

    @Column(type => Role)
    role: Role;
}
