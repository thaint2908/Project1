import {IsOptional} from "class-validator";

export class GetProductsFilterDto {
    @IsOptional()
    page: number;

    @IsOptional()
    search: string;

    @IsOptional()
    sort: string;

    @IsOptional()
    category: string;

    @IsOptional()
    star: number;

    @IsOptional()
    price: string;
}
