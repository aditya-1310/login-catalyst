import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";



@Schema({
    timestamps: true
})
export class User {
    @Prop()
    name:string
    @Prop({unique:[true,'Duplicate email entered']})
    email:string
    @Prop()
    password:string
    @Prop()
    phone_number:number
    @Prop()
    gender:string
}

export const UserSchema = SchemaFactory.createForClass(User);