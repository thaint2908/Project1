import {Module} from "@nestjs/common";
import {TypeOrmModule} from "@nestjs/typeorm";

import {User} from "./entities/user.entity";
import {Role} from "./entities/role.entity";
import {UsersController} from "./users.controller";
import {UsersService} from "./users.service";

@Module({
    imports: [
        TypeOrmModule.forFeature([User, Role])
    ],
    controllers: [UsersController],
    providers: [UsersService],
    exports: [TypeOrmModule]
})
export class UsersModule {
}
