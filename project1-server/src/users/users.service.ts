import {Injectable, InternalServerErrorException} from "@nestjs/common";
import {User} from "./entities/user.entity";
import {auth} from 'firebase-admin';

import {Role} from "./entities/role.entity";
import {CreateUserDto} from "./dto/create-user.dto";
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User) private readonly userRepository: Repository<User>,
        @InjectRepository(Role) private readonly roleRepository: Repository<Role>
    ) {
    }

    async createUser(createUserDto: CreateUserDto): Promise<User> {
        try {
            const roleId = createUserDto.role;
            const role = await this.roleRepository.findOne({_id: +roleId});

            const userRecord = await auth().createUser({
                displayName: createUserDto.username,
                email: createUserDto.email,
                password: createUserDto.password
            });
            await auth().setCustomUserClaims(userRecord.uid, {
                role: role.name
            });

            const user = this.userRepository.create({
                username: userRecord.displayName,
                email: userRecord.email,
                firebaseUid: userRecord.uid,
                role
            });

            return this.userRepository.save(user);
        } catch (err) {
            throw new InternalServerErrorException(err);
        }
    }

    async getAllUsers(): Promise<User[]> {
        return this.userRepository.find();
    }
}
