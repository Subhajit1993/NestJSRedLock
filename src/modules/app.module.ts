import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductSchema } from '../schemas/products.schema';
import { OrderSchema } from '../schemas/order.schema';
import { RedisClient } from '../lib/ioredis';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost/sweet-lock'),
    MongooseModule.forFeature([
      {
        name: 'Orders',
        schema: OrderSchema,
      },
      {
        name: 'Products',
        schema: ProductSchema,
      },
    ]),
  ],
  controllers: [AppController],
  providers: [AppService, RedisClient],
})
export class AppModule {}
