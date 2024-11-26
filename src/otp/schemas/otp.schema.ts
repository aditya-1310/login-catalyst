import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type OtpDocument = HydratedDocument<Otp>;

@Schema()
export class Otp {
  @Prop({ required: true })
  userId: string;

  @Prop({ required: true })
  otp: string;

  // This field will trigger the TTL index
  @Prop({ required: true, default: () => new Date(), expires: 600 }) // 600 seconds = 10 minutes
  createdAt: Date;
}

export const OtpSchema = SchemaFactory.createForClass(Otp);
