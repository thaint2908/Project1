import {Module} from '@nestjs/common';
import {ConfigModule} from "@nestjs/config";
import {APP_GUARD} from "@nestjs/core";
import {TypeOrmModule} from "@nestjs/typeorm";

import {UsersModule} from "./users/users.module";
import {AuthModule} from './auth/auth.module';
import {ProductsModule} from "./products/products.module";
import {CategoriesModule} from "./categories/categories.module";
import {RolesGuard} from "./shared/guards/roles.guard";
import {CartsModule} from './carts/carts.module';
import {ItemsModule} from './items/items.module';
import {OrdersModule} from './orders/orders.module';

@Module({
    imports: [
        ConfigModule.forRoot(),
        UsersModule,
        AuthModule,
        TypeOrmModule.forRoot({
            type: "mongodb",
            url: process.env.MONGO_URI,
            useUnifiedTopology: true,
            synchronize: false,
            entities: [__dirname + '/**/*.entity{.ts,.js}'],
            cache: {
                duration: 60000
            }
        }),
        ProductsModule,
        CategoriesModule,
        CartsModule,
        ItemsModule,
        OrdersModule
    ],
    providers: [
        {
            provide: APP_GUARD,
            useClass: RolesGuard
        }
    ]
})
export class AppModule {
}
