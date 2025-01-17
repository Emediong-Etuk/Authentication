import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/entity/user.entity';


@Module({
  providers: [UserService],
  imports:[TypeOrmModule.forFeature([User])],
  exports:[UserService],
  
})
export class UserModule {}
