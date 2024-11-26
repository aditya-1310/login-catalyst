import { Body,Controller,Get,Post } from '@nestjs/common';
import { SignupDto } from './dto/signup.dto';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {
    constructor(private authService:AuthService){}

    @Post('/signup')
    signup(@Body() signUpDto:SignupDto):Promise<{token:string}>{
        return this.authService.signup(signUpDto);
    }
    @Get('/login')
    login(@Body() loginDto:LoginDto):Promise<{token:string}>{
        return this.authService.login(loginDto);
    }
}

