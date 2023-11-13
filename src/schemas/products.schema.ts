import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type ProductDocument = HydratedDocument<Products>;

@Schema({
  timestamps: true,
  collection: 'products',
})
export class Products {
  @Prop()
  product_id: number;

  @Prop()
  name: string;

  @Prop()
  price: number;

  @Prop()
  business_id: number;

  @Prop({
    default: 0,
  })
  available_quantity: number;
}

export const ProductSchema = SchemaFactory.createForClass(Products);
