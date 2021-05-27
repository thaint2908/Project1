import {OmitType} from "@nestjs/mapped-types";
import {SignUpDto} from "./signUp.dto";

export class LoginDto extends OmitType(SignUpDto, ['username'] as const) {

}
