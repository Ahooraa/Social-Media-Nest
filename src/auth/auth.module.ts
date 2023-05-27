import { Module, forwardRef } from '@nestjs/common';
import { AuthController } from './auth.controller';

import { UserModule } from 'src/user/user.module';
import { AuthGuard } from './auth.guard';
import { APP_GUARD } from '@nestjs/core';

@Module({
  imports: [forwardRef(() => UserModule)],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
  controllers: [AuthController],
})
export class AuthModule {}
