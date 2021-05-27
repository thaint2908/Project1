import {EntityRepository, Repository} from "typeorm";
import {ObjectID} from 'mongodb';
import {Product} from "../entities/product.entity";
import {CreateProductDto} from "../dto/create-product.dto";
import * as _ from "lodash";
import {nonAccentVietnamese} from "../../shared/utils/non-vietnamese.util";
import {GetProductsFilterDto} from "../dto/get-products-filter.dto";
import {InternalServerErrorException, NotFoundException} from "@nestjs/common";

@EntityRepository(Product)
export class ProductRepository extends Repository<Product> {
    async getProducts(filterDto: GetProductsFilterDto): Promise<any> {
        const {page, search, category, price, sort, star} = filterDto;
        const curPage = page || 1;
        const perPage = 8;

        let findQuery: any = {};
        const sortQuery: any = {};
        if (search) {
            findQuery = {
                ...findQuery,
                "$text": {"$search": `\"${_.lowerCase(nonAccentVietnamese(search))}\"`}
            };
        }
        if (category) {
            findQuery = {
                ...findQuery,
                key_category: `${_.lowerCase(nonAccentVietnamese(category))}`
            };
        }
        if (sort) {
            const [field, order] = sort.split("|");
            if (order === "ascd") {
                sortQuery.field = field;
                sortQuery.order = 1;
            } else if (order === "desc") {
                sortQuery.field = field;
                sortQuery.order = -1;
            }
        }
        if (star) {
            findQuery.rating_average = {"$gt": Number(star)};
        }
        if (price) {
            const [from, to] = price.split(",");
            findQuery.price = {"$gte": Number(from), "$lte": Number(to)};
        }

        try {
            const searchProducts = await this.find({
                select: [
                    "_id",
                    "category"
                ],
                where: findQuery,
                order: sort ? {
                    [sortQuery.field]: sortQuery.order
                } : {key_name: -1}
            });

            const ids = searchProducts.slice((curPage - 1) * perPage, curPage * perPage);

            const prodIds = ids.map(p => p._id);

            const products = await this.find({
                select: [
                    "_id",
                    "name",
                    "price",
                    "list_price",
                    "image_url",
                    "rating_average",
                    "review_count",
                    "category"
                ],
                where: {
                    _id: {$in: prodIds}
                },
                order: sort ? {
                    [sortQuery.field]: sortQuery.order
                } : {key_name: -1}
            });

            let countCategories = {};

            if (search) {
                let searchCategories = [];
                searchProducts.forEach(product => {
                    searchCategories = [...searchCategories, product.category];
                });

                searchCategories.forEach(function (i) {
                    countCategories = {
                        ...countCategories,
                        [i]: (countCategories[i] || 0) + 1
                    };
                });

                return {
                    message: "Fetch products successfully!",
                    products: products,
                    totalDocs: searchProducts.length,
                    searchCategories: countCategories
                }
            }

            return {
                message: "Fetch products successfully!",
                products: products,
                totalDocs: searchProducts.length
            }
        } catch (err) {
            throw new InternalServerErrorException(err);
        }
    }

    async getProduct(id: string): Promise<Product> {
        const objectId = new ObjectID(id);
        const product = await this.findOne({
            select: [
                "_id",
                "name",
                "image_url",
                "price",
                "list_price",
                "rating_average",
                "review_count",
                "category",
                "summary_description",
                "description"
            ],
            where: {_id: objectId}
        });
        if (!product) {
            throw new NotFoundException("Could not find this product!");
        }

        return product;
    }

    async createProduct(imageUrl: string, createProductDto: CreateProductDto): Promise<Product> {
        const {name, price, description, category, summary_description} = createProductDto;

        const product = this.create({
            name,
            price,
            summary_description,
            description,
            image_url: imageUrl,
            category,
            key_name: _.lowerCase(nonAccentVietnamese(name)),
            key_category: _.lowerCase(nonAccentVietnamese(category))
        });

        try {
            return this.save(product);
        } catch (err) {
            throw new InternalServerErrorException(err);
        }
    }
}
