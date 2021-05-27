import {Injectable} from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import * as fs from "fs";

import {ProductRepository} from "./repositories/product.repository";
import {CreateProductDto} from "./dto/create-product.dto";
import {Product} from "./entities/product.entity";
import {GetProductsFilterDto} from "./dto/get-products-filter.dto";
import {ObjectID} from "mongodb";

@Injectable()
export class ProductsService {
    constructor(
        @InjectRepository(ProductRepository)
        private productRepository: ProductRepository
    ) {
    }

    async getAllProducts() {
        return this.productRepository.find({
            select: [
                "_id",
                "category"
            ],
            where: {}
        });
    }

    async getProducts(filterDto: GetProductsFilterDto): Promise<any> {
        return this.productRepository.getProducts(filterDto);
    }

    async getProduct(id: string): Promise<Product> {
        return this.productRepository.getProduct(id);
    }

    async createProduct(imgPath: string, createProductDto: CreateProductDto): Promise<Product> {
        return this.productRepository.createProduct(imgPath, createProductDto);
    }

    async deleteProduct(id: string): Promise<any> {
        const product = await this.productRepository.findOne(id);
        fs.unlinkSync(product.image_url);

        await this.productRepository.delete(id);
    }

    async deleteAllProducts(): Promise<void> {
        await this.productRepository.clear();
    }
}
