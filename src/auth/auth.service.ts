import {Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import { ConfigService } from '@nestjs/config';


@Injectable()
export class AuthService {
    constructor(private readonly userService:UserService, private readonly jwtService:JwtService, private readonly configService:ConfigService){}

    async signIn(username:string, pass:string): Promise<{access_token:string}>{
        const user= await this.userService.findOneUser(username)
        if((user)?.password !==pass){
            throw new UnauthorizedException();
        }

        const payload={sub:user.id,username:user.name};
        return {
            access_token:await this.jwtService.signAsync(payload,{expiresIn:'1h'})
        }
    }
}
