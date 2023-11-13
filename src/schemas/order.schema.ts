import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type OrderDocument = HydratedDocument<Orders>;

@Schema({
  timestamps: true,
  collection: 'orders',
})
export class Orders {
  @Prop({
    required: true,
  })
  order_id: number;

  @Prop({
    required: true,
  })
  product_id: number;

  @Prop()
  final_price: number;

  @Prop()
  business_id: string;
}

export const OrderSchema = SchemaFactory.createForClass(Orders);
