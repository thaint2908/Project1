import {Injectable, NotFoundException} from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {auth} from 'firebase-admin';
import {ObjectID} from 'mongodb';

import {Cart} from "./entities/cart.entity";
import {AddToCartDto} from './dto/add-to-cart.dto';
import {User} from "../users/entities/user.entity";
import {Product} from "../products/entities/product.entity";
import {Item} from "../items/entities/item.entity";
import {Status} from "../shared/enums/status.enum";

@Injectable()
export class CartsService {
    constructor(
        @InjectRepository(Cart) private readonly cartRepository: Repository<Cart>,
        @InjectRepository(User) private readonly userRepository: Repository<User>,
        @InjectRepository(Product) private readonly productRepository: Repository<Product>,
    ) {
    }

    async createOrUpdate(token: string, addToCartDto: AddToCartDto): Promise<Cart> {
        const user = await this.getUser(token);
        const product = await this.productRepository.findOne({
            where: {
                _id: new ObjectID(addToCartDto.item.id)
            }
        });
        const item: Item = {
            product,
            quantity: addToCartDto.item.quantity
        };

        const foundCart = await this.cartRepository.findOne({
            where: {
                user,
                status: Status.PENDING
            }
        });

        if (!foundCart) {
            const newCart = this.cartRepository.create({
                totalPrice: addToCartDto.totalPrice,
                user,
                status: Status.PENDING
            });
            newCart.items = [item];

            return this.cartRepository.save(newCart);
        } else {
            const foundItem = new Item(item.product, item.quantity);
            const foundIndex = foundCart.items.findIndex((value, index, obj) => {
                if (value.product._id.toString() === foundItem.product._id.toString()) {
                    return true;
                }
            });

            if (foundIndex !== -1) {
                foundCart.totalPrice -= foundCart.items[foundIndex].quantity * foundCart.items[foundIndex].product.price;
                foundCart.items[foundIndex].quantity = item.quantity;

            } else {
                foundCart.items = [
                    ...foundCart.items,
                    foundItem
                ];
            }
            foundCart.totalPrice += addToCartDto.totalPrice;

            return this.cartRepository.save(foundCart);
        }
    }

    async findAll(): Promise<Cart[]> {
        return this.cartRepository.find();
    }

    async findOne(token: string): Promise<Cart> {
        const user = await this.getUser(token);

        return this.cartRepository.findOne({
            where: {
                user,
                status: Status.PENDING
            }
        });
    }

    async remove(token: string, prodId: string): Promise<Cart> {
        const user = await this.getUser(token);
        const cart = await this.cartRepository.findOne({
            where: {
                user
            }
        });
        const foundIndex = cart.items.findIndex((value, index, obj) => {
            if (value.product._id.toString() === prodId) {
                return true;
            }
        });

        if (foundIndex === -1) {
            throw new NotFoundException('Can not find product');
        } else {
            cart.totalPrice -= cart.items[foundIndex].product.price * cart.items[foundIndex].quantity;
            cart.items.splice(foundIndex, 1);
        }

        return this.cartRepository.save(cart);
    }

    private async getUser(token: string): Promise<User> {
        const decodeToken = await auth().verifyIdToken(token);
        const uid = decodeToken.uid;
        const user = await this.userRepository.findOne({
            firebaseUid: uid
        });

        return user;
    }
}
