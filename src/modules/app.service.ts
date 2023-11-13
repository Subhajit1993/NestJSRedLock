import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Products } from '../schemas/products.schema';
import { Orders } from '../schemas/order.schema';
import { Model } from 'mongoose';
import { RedisClient } from '../lib/ioredis';

@Injectable()
export class AppService {
  constructor(
    @InjectModel(Products.name) private productModel: Model<Products>,
    @InjectModel(Orders.name) private orderModel: Model<Orders>,
    private readonly redisClient: RedisClient,
  ) {}

  getHello(): string {
    return 'Hello World!';
  }

  createDelay(ms: number) {
    return new Promise((resolve) => {
      setTimeout(resolve, ms);
    });
  }

  async placeOrder(product_id, quantity): Promise<boolean> {
    const product = await this.productModel.findOne({ product_id: product_id });
    // Check if locked
    if (await this.redisClient.getLock(product_id)) {
      return false;
    }
    // Apply redis lock here
    await this.redisClient.lock(product_id, 1000);
    await this.createDelay(10000);
    if (product.available_quantity >= quantity) {
      product.available_quantity -= quantity;
      await product.save();
      return true;
    }
    await this.orderModel.create({
      product_id,
      final_price: product.price,
      business_id: product.business_id,
      order_id: Math.floor(Math.random() * 1000000),
    });
    await this.redisClient.unlock(product_id);
  }

  async addProduct(product_id, quantity, business_id, price): Promise<boolean> {
    // add new product to db
    const newProduct = new this.productModel({
      product_id: product_id,
      name: 'new product',
      price,
      business_id,
      available_quantity: quantity,
    });
    await newProduct.save();
    return true;
  }
}
