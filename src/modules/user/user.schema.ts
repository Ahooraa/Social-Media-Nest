import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
// import { TodoCategory } from '';

export type UserDocument = HydratedDocument<User>;

@Schema({})
export class User {
    @Prop({required: true, unique: true})
    username: string;
    @Prop({required: true, unique: true})
    email: string;
    @Prop({required: true})
    password: string;
    @Prop({required: true})
    phoneNumber: string;

    @Prop({required: true})
    role: string;


}

export const userSchema = SchemaFactory.createForClass(User);