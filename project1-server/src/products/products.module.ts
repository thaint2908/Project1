import {Module} from '@nestjs/common';
import {MulterModule} from "@nestjs/platform-express";
import {TypeOrmModule} from "@nestjs/typeorm";
import {diskStorage} from 'multer';

import {ProductsController} from './products.controller';
import {ProductsService} from './products.service';
import {Product} from "./entities/product.entity";
import {ProductRepository} from "./repositories/product.repository";
import {editFileName, imageFileFilter} from "../shared/utils/file-upload.util";

@Module({
    imports: [
        TypeOrmModule.forFeature([Product, ProductRepository]),
        MulterModule.register({
            fileFilter: imageFileFilter,
            storage: diskStorage({
                destination: 'uploads',
                filename: editFileName
            })
        })
    ],
    controllers: [
        ProductsController
    ],
    providers: [ProductsService],
    exports: [
        ProductsService,
        TypeOrmModule
    ]
})
export class ProductsModule {
}
