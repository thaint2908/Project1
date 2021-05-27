import {Module} from '@nestjs/common';
import {TypeOrmModule} from "@nestjs/typeorm";

import {OrdersService} from './orders.service';
import {OrdersController} from './orders.controller';
import {Order} from "./entities/order.entity";
import {CartsModule} from "../carts/carts.module";
import {UsersModule} from "../users/users.module";

@Module({
    imports: [
        TypeOrmModule.forFeature([Order]),
        CartsModule,
        UsersModule
    ],
    controllers: [OrdersController],
    providers: [OrdersService]
})
export class OrdersModule {
}
