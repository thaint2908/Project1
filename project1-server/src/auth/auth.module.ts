import {Module} from '@nestjs/common';
import {AuthService} from "./auth.service";
import {AuthController} from "./auth.controller";
import {UsersModule} from "../users/users.module";
import {UsersService} from "../users/users.service";

@Module({
    imports: [UsersModule],
    controllers: [AuthController],
    providers: [AuthService, UsersService]
})
export class AuthModule {
}
