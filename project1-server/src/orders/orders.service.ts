import {BadRequestException, Injectable} from '@nestjs/common';
import {CreateOrderDto} from './dto/create-order.dto';
import {InjectRepository} from "@nestjs/typeorm";
import {Order} from "./entities/order.entity";
import {Repository} from "typeorm";
import {ObjectID} from "mongodb";
import {auth} from 'firebase-admin';

import {Cart} from "../carts/entities/cart.entity";
import {Status} from "../shared/enums/status.enum";
import {User} from "../users/entities/user.entity";

@Injectable()
export class OrdersService {
    constructor(
        @InjectRepository(Order) private readonly orderRepository: Repository<Order>,
        @InjectRepository(Cart) private readonly cartRepository: Repository<Cart>,
        @InjectRepository(User) private readonly userRepository: Repository<User>
    ) {
    }

    async create(token: string, createOrderDto: CreateOrderDto): Promise<Order> {
        const user = await this.getUser(token);

        const cart = await this.cartRepository.findOne({
            where: {
                _id: new ObjectID(createOrderDto.cartId)
            }
        });

        if (user._id.toString() !== cart.user._id.toString()) {
            throw new BadRequestException('Invalid credential');
        }

        const order = this.orderRepository.create({
            items: cart.items,
            totalPrice: cart.totalPrice,
            user: cart.user,
            status: Status.PENDING,
            orderedDate: new Date(createOrderDto.orderedDate)
        });
        const savedOrder = await this.orderRepository.save(order);

        cart.status = Status.ORDERED;
        await this.cartRepository.save(cart);

        return savedOrder;
    }

    async findAll(): Promise<Order[]> {
        return this.orderRepository.find();
    }

    async findAllByUser(token: string): Promise<Order[]> {
        const user = await this.getUser(token);

        return this.orderRepository.find({
            where: {
                user
            }
        });
    }

    private async getUser(token: string) {
        const decodeToken = await auth().verifyIdToken(token);
        const uid = decodeToken.uid;
        const user = await this.userRepository.findOne({
            firebaseUid: uid
        });

        return user;
    }

    async findOne(id: string): Promise<Order> {
        return this.orderRepository.findOne({
            where: {
                _id: new ObjectID(id)
            }
        });
    }

    async remove(id: string): Promise<any> {
        await this.orderRepository.delete(id);
    }
}
