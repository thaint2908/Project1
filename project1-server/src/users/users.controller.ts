import {Body, Controller, Get, Post} from "@nestjs/common";
import {UsersService} from "./users.service";
import {CreateUserDto} from "./dto/create-user.dto";

import {Roles} from "../shared/decorators/roles.decorator";
import {Role} from "../shared/enums/role.enum";

@Roles(Role.Admin)
@Controller('users')
export class UsersController {
    constructor(
        private readonly usersService: UsersService
    ) {
    }

    @Post()
    async createNewUser(@Body() createUserDto: CreateUserDto) {
        return this.usersService.createUser(createUserDto);
    }

    @Get()
    async getAllUsers() {
        return this.usersService.getAllUsers();
    }
}
