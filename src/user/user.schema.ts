import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { UserRole } from './user.enum';
import * as bcrypt from 'bcrypt';
import { Post } from 'src/post/post.schema';

export type UserDocument = HydratedDocument<User>;

@Schema({ timestamps: true })
export class User {
  @Prop({ required: true })
  email: string;

  @Prop({ required: true, unique: true })
  username: string;

  @Prop({ required: true })
  password: string;

  @Prop({ required: false, unique: true })
  phoneNumber: string;

  @Prop(UserRole)
  type: UserRole;

  @Prop()
  profilePic: string;

  @Prop({ required: false })
  description: string;

  @Prop({ required: true })
  city: string;

  @Prop({ type: [String], default: [] })
  followers: string[];

  @Prop({ type: [String], default: [] })
  followings: string[];

  @Prop({ type: [Post], default: [] })
  posts: Post[];

  @Prop({ default: Date.now })
  createdAt!: Date;

  @Prop({ default: Date.now })
  updatedAt!: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);

async function generateHash(password: string) {
  return bcrypt.hash(password, 11);
}

UserSchema.pre('save', function (next) {
  const user = this;
  if (user.isNew || user.isModified('password')) {
    return generateHash(user.password)
      .then((hash) => {
        user.password = hash;
        return next();
      })
      .catch((error) => {
        return next(error);
      });
  }
  return next();
});
