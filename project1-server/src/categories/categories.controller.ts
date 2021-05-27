import {Controller, Get, InternalServerErrorException} from '@nestjs/common';
import {ProductsService} from "../products/products.service";
import * as _ from "lodash";

@Controller('categories')
export class CategoriesController {
    constructor(private productsService: ProductsService) {
    }

    @Get()
    async getCategories(): Promise<any> {
        const products = await this.productsService.getAllProducts();
        const allCategories = products.map(p => {
            return p.category;
        });

        try {
            return {
                message: "Fetch all categories successfully!",
                categories: _.uniq(allCategories)
            }
        } catch (err) {
            throw new InternalServerErrorException();
        }
    }
}
