import { Module, forwardRef } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserModule } from 'src/user/user.module';

@Module({
  imports:[forwardRef(()=> UserModule)],
  providers: [AuthService],
  controllers: [AuthController],    
})
export class AuthModule {}
