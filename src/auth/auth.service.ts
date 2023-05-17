import { Injectable , UnauthorizedException} from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt'

@Injectable()
export class AuthService {
    constructor( private userService: UserService){}

    async signIn(userName:string, pass:string): Promise<any>{
        const user = await this.userService.findUserByUsername(userName);
        if (user?.password !== pass) {
            throw new UnauthorizedException();
          }
          const { password, ...result } = user;
          // TODO: Generate a JWT and return it here
          // instead of the user object
          return result;
    }
}
