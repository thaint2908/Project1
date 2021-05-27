import {Body, Controller, Delete, Get, Headers, Param, Post} from '@nestjs/common';

import {CartsService} from './carts.service';
import {AddToCartDto} from './dto/add-to-cart.dto';
import {Roles} from "../shared/decorators/roles.decorator";
import {Role} from "../shared/enums/role.enum";
import {Cart} from "./entities/cart.entity";

@Controller('carts')
export class CartsController {
    constructor(private readonly cartsService: CartsService) {
    }

    @Post()
    async createOrUpdate(
        @Headers('Authorization') authorization: string,
        @Body() createCartDto: AddToCartDto
    ): Promise<Cart> {
        return this.cartsService.createOrUpdate(
            authorization.replace('Bearer', '').trim(),
            createCartDto
        );
    }

    @Roles(Role.Admin)
    @Get()
    async findAll(): Promise<Cart[]> {
        return this.cartsService.findAll();
    }

    @Get('mine')
    async findOne(@Headers('Authorization') authorization: string): Promise<Cart> {
        return this.cartsService.findOne(
            authorization.replace('Bearer', '').trim()
        );
    }

    @Delete('mine/:prodId')
    async remove(
        @Headers('Authorization') authorization: string,
        @Param('prodId') prodId: string
    ): Promise<Cart> {
        return this.cartsService.remove(
            authorization.replace('Bearer', '').trim(),
            prodId
        );
    }
}
