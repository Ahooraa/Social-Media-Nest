import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument, ObjectId } from 'mongoose';

export type PostDocument = HydratedDocument<Post>;

@Schema({ _id: true })
export class Comment {
  @Prop({ required: true })
  userId!: string;

  @Prop({ required: true })
  comment!: string;
}

@Schema({ timestamps: true })
export class Post {
  @Prop({ unique: true, required: true })
  title: string;

  @Prop({ type: mongoose.Types.ObjectId, required: true })
  userId: ObjectId;

  @Prop()
  text: string;

  @Prop({ required: true })
  image!: Buffer;

  @Prop()
  liked: string[];

  @Prop([Comment])
  comment: Comment[];
}

export const PostSchema = SchemaFactory.createForClass(Post);
