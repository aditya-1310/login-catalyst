import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";
import * as bcrypt from 'bcrypt';


@Schema({
    timestamps: true,
})
export class User extends Document {
    @Prop({ required: true })
    name: string;

    @Prop({
        required: true,
        unique: true,
        validate: {
            validator: (email: string) => /^\S+@\S+\.\S+$/.test(email),
            message: "Please enter a valid email",
        },
    })
    email: string;

    @Prop({ required: true })
    password: string;

    @Prop({ required: true })
    phone_number: number;

    @Prop({ required: true, enum: ['Male', 'Female', 'Other'] })
    gender: string;
}

export const UserSchema = SchemaFactory.createForClass(User);

// Pre-save hook for password hashing
UserSchema.pre<User>('save', async function (next) {
    if (!this.isModified('password')) return next();
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});
