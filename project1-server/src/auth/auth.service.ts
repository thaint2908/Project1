import {Injectable} from "@nestjs/common";
import firebase from 'firebase/app';
import 'firebase/auth';
import UserCredential = firebase.auth.UserCredential;

import {LoginDto} from "./dto/login.dto";
import {SignUpDto} from "./dto/signUp.dto";
import {UsersService} from "../users/users.service";

@Injectable()
export class AuthService {
    constructor(
        private readonly usersService: UsersService
    ) {
    }

    async loginUser(loginDto: LoginDto): Promise<UserCredential> {
        return firebase.auth().signInWithEmailAndPassword(loginDto.email, loginDto.password);
    }

    async signUpUser(signUpDto: SignUpDto) {
        const user = this.usersService.createUser({
            username: signUpDto.username,
            email: signUpDto.email,
            password: signUpDto.password,
            role: 2
        });

        return user;
    }
}
