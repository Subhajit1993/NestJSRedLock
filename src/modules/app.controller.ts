import { Controller, Get, Post, Req } from '@nestjs/common';
import { AppService } from './app.service';
import { Request } from 'express';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/')
  getHello(): string {
    return this.appService.getHello();
  }

  @Post('/place-order')
  placeOrder(@Req() request: Request): Promise<boolean> {
    const { product_id, quantity } = request.body;
    return this.appService.placeOrder(product_id, quantity);
  }

  @Post('/add-product')
  addProduct(@Req() request: Request): Promise<boolean> {
    const { product_id, quantity, business_id, price } = request.body;
    return this.appService.addProduct(product_id, quantity, business_id, 100);
  }
}
