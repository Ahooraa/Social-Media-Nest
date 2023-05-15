import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';

export type PostDocument = HydratedDocument<Post>;

@Schema({ _id: true })
export class Comment {
  @Prop({required: true })
  userId!: string;

  @Prop({required : true})
  comment!: string;
}

@Schema({ timestamps: true })
export class Post {
  @Prop({unique: true, required: true})
  title: string;

  @Prop({required: true})
  userId: string;

  @Prop()
  text: string;

  @Prop({ required: true })
  image!: Buffer;

  @Prop()
  liked: string[];

  @Prop([Comment])
  comment: Comment[];

  // @Prop()
  // save: string;
}

export const PostSchema = SchemaFactory.createForClass(Post);
