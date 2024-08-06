import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {Repository} from 'typeorm';
import { User } from 'src/entity/user.entity';
import { createUserDTO } from '../dto/create.dto';


@Injectable()
export class UserService {
    constructor(@InjectRepository(User) private readonly userRepository:Repository<User>){}


    async create(createUserDTO:createUserDTO){
        const createUser=  this.userRepository.create(createUserDTO)
        return this.userRepository.save(createUser);
    }
    async findOneUser(username:string){
        return this.userRepository.findOne({where:{name:username}});
    }
}
