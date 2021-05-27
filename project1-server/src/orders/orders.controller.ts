import {Body, Controller, Delete, Get, Headers, Param, Post} from '@nestjs/common';
import {OrdersService} from './orders.service';
import {CreateOrderDto} from './dto/create-order.dto';
import {Order} from "./entities/order.entity";
import {Roles} from "../shared/decorators/roles.decorator";
import {Role} from "../shared/enums/role.enum";

@Controller('orders')
export class OrdersController {
    constructor(private readonly ordersService: OrdersService) {
    }

    @Post()
    async create(
        @Headers('Authorization') authorization: string,
        @Body() createOrderDto: CreateOrderDto
    ): Promise<Order> {
        return this.ordersService.create(
            authorization.replace('Bearer', '').trim(),
            createOrderDto
        );
    }

    @Roles(Role.Admin)
    @Get()
    async findAll(): Promise<Order[]> {
        return this.ordersService.findAll();
    }

    @Get('mine')
    async findAllByUser(
        @Headers('Authorization') authorization: string
    ): Promise<Order[]> {
        return this.ordersService.findAllByUser(
            authorization.replace('Bearer', '').trim()
        );
    }

    @Get(':id')
    async findOne(@Param('id') id: string): Promise<Order> {
        return this.ordersService.findOne(id);
    }

    @Roles(Role.Admin)
    @Delete(':id')
    async remove(@Param('id') id: string): Promise<any> {
        return this.ordersService.remove(id);
    }
}
