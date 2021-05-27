import {IsNotEmpty} from "class-validator";

export class CreateProductDto {
    @IsNotEmpty()
    name: string;

    @IsNotEmpty()
    price: number;

    image: any;

    @IsNotEmpty()
    summary_description: string;

    @IsNotEmpty()
    description: string;

    @IsNotEmpty()
    category: string;
}
