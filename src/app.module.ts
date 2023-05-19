import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PostModule } from './post/post.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    MongooseModule.forRoot("mongodb+srv://social:media@social-media.ohgm7gm.mongodb.net/"),
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    JwtModule.registerAsync({
      global: true,
      useFactory: (config: ConfigService) => {
        return {
          secret: config.get('JWT_SECRET'),
          signOptions: {
            expiresIn: config.get('JWT_EXPIRE'),
          },
        };
      },
      inject: [ConfigService],
    }),
    PostModule,
    UserModule,
    AuthModule,
    ConfigModule,
  ],
  controllers: [],
  providers: [ConfigService],
})
export class AppModule {}
