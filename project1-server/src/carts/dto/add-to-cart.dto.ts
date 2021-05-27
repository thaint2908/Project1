import {IsNumber} from "class-validator";

export type ChosenItem = {
    id: string;
    quantity: number;
};

export class AddToCartDto {
    readonly item: ChosenItem;

    @IsNumber()
    readonly totalPrice: number;
}
