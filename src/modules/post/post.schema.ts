import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

@Schema({})
class Post {
    // @Prop({required: true, unique: true})
    // username: string;
    // @Prop({required: true, unique: true})
    // email: string;
    // @Prop({required: true})
    // password: string;
    // @Prop({required: true})
    // phoneNumber: string;

    // @Prop({required: true})
    // role: string;


}

export const PostSchema = SchemaFactory.createForClass(Post);
