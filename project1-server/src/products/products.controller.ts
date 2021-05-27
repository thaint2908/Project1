import {
    Body,
    Controller,
    Delete,
    Get, HttpCode,
    InternalServerErrorException,
    Param,
    Post,
    Query, Res, UploadedFile, UseInterceptors,
    ValidationPipe
} from '@nestjs/common';
import {ProductsService} from "./products.service";
import {GetProductsFilterDto} from "./dto/get-products-filter.dto";
import {CreateProductDto} from "./dto/create-product.dto";
import {Product} from "./entities/product.entity";
import {Roles} from "../shared/decorators/roles.decorator";
import {Role} from "../shared/enums/role.enum";
import {FileInterceptor} from "@nestjs/platform-express";

@Controller()
export class ProductsController {
    constructor(
        private productsService: ProductsService
    ) {
    }

    @Get('products')
    async getProducts(
        @Query(ValidationPipe) filterDto: GetProductsFilterDto,
    ): Promise<any> {
        return this.productsService.getProducts(filterDto);
    }

    @Get("products/:id")
    async getProduct(@Param("id") id: string) {
        const product = await this.productsService.getProduct(id);

        try {
            return {
                message: "Fetch product successfully",
                product: product
            };
        } catch (err) {
            throw new InternalServerErrorException(err);
        }
    }

    @Get('uploads/:imgPath')
    async getProductImage(@Param('imgPath') image, @Res() res) {
        return res.sendFile(image, {root: 'uploads'});
    }

    @Roles(Role.Admin)
    @Post('products')
    @UseInterceptors(FileInterceptor('image'))
    async createProduct(
        @Body() createProductDto: CreateProductDto,
        @UploadedFile() file
    ): Promise<Product> {
        return this.productsService.createProduct(file.path.replace('\\', '/'), createProductDto);
    }

    @Roles(Role.Admin)
    @Delete('products/:id')
    @HttpCode(204)
    async deleteProduct(@Param('id') id: string): Promise<any> {
        await this.productsService.deleteProduct(id);
    }
}
