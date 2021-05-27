import {Module} from '@nestjs/common';
import {CartsService} from './carts.service';
import {CartsController} from './carts.controller';
import {ItemsModule} from "../items/items.module";
import {UsersModule} from "../users/users.module";
import {TypeOrmModule} from "@nestjs/typeorm";
import {Cart} from "./entities/cart.entity";
import {ProductsModule} from "../products/products.module";

@Module({
    imports: [
        TypeOrmModule.forFeature([Cart]),
        ItemsModule,
        UsersModule,
        ProductsModule
    ],
    controllers: [CartsController],
    providers: [CartsService],
    exports: [TypeOrmModule]
})
export class CartsModule {
}
