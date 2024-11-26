import { Body, Controller, Post, BadRequestException, UsePipes, ValidationPipe } from '@nestjs/common';
import { SignupDto } from './dto/signup.dto';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @Post('/signup')
    @UsePipes(new ValidationPipe())
    async signup(@Body() signUpDto: SignupDto): Promise<{ token: string }> {
        try {
            return await this.authService.signup(signUpDto);
        } catch (error) {
            throw new BadRequestException('Signup failed: ' + error.message);
        }
    }

    @Post('/login')
    @UsePipes(new ValidationPipe())
    async login(@Body() loginDto: LoginDto): Promise<{ token: string }> {
        try {
            return await this.authService.login(loginDto);
        } catch (error) {
            throw new BadRequestException('Login failed: ' + error.message);
        }
    }
}
