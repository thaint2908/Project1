import {IsNotEmpty, IsString} from "class-validator";

export class CreateOrderDto {
    @IsNotEmpty()
    @IsString()
    cartId: string;

    @IsNotEmpty()
    @IsString()
    orderedDate: string;
}
