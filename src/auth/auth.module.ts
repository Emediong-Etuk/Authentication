import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from 'src/user/user.module';
import { JwtModule } from '@nestjs/jwt';
import * as dotenv from 'dotenv';
import { ConfigModule } from '@nestjs/config';


dotenv.config()

@Module({
  imports:[UserModule,
    ConfigModule,
    JwtModule.register({
    global:true,
    secret:process.env.SECRET,
    signOptions:{expiresIn:'1h'},

  })],
  providers: [AuthService],
  controllers: [AuthController],
  exports:[AuthService]
  
})
export class AuthModule {}
