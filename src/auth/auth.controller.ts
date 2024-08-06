import {Body, Controller,Post, HttpCode,HttpStatus,UseGuards,Request,Get } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from 'src/dto/login.dto';
import { createUserDTO } from 'src/dto/create.dto';
import { UserService } from 'src/user/user.service';
import { AuthGuard } from './auth.guard';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService:AuthService, private readonly userService:UserService){}

    @HttpCode(HttpStatus.OK)
    @Post('login')
    signin(@Body() loginDto:LoginDto){
        return this.authService.signIn(loginDto.name,loginDto.password)
    }

    @Post('signup')
    signup(@Body() createUserDTO:createUserDTO){
        return this.userService.create(createUserDTO)
    }

    @UseGuards(AuthGuard)
    @Get('profile')
    getProfile(@Request() req){
        return req.user;
    }

}
