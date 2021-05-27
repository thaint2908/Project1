import {Body, Controller, HttpCode, Post} from "@nestjs/common";
import {AuthService} from "./auth.service";
import {LoginDto} from "./dto/login.dto";
import {LoginResponse} from "./util/login.response";
import {SignUpDto} from "./dto/signUp.dto";
import {User} from "../users/entities/user.entity";

@Controller()
export class AuthController {
    constructor(
        private readonly authService: AuthService
    ) {
    }

    @Post('login')
    @HttpCode(200)
    async login(@Body() loginDto: LoginDto): Promise<LoginResponse> {
        const userCredential = await this.authService.loginUser(loginDto);
        const tokenData = await userCredential.user.getIdTokenResult();

        return {
            accessToken: tokenData.token,
            expiresIn: new Date(tokenData.expirationTime).getTime() - new Date(tokenData.issuedAtTime).getTime()
        };
    }

    @Post('sign-up')
    async signUp(@Body() signUpDto: SignUpDto): Promise<User> {
        return this.authService.signUpUser(signUpDto);
    }
}
