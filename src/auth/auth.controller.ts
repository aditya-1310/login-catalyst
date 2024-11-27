import { Body, Controller, Post, HttpException, HttpStatus, ValidationPipe } from '@nestjs/common';
import { SignupDto } from './dto/signup.dto';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { VerifyOtpDto } from './dto/verify-otp.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/signup')
  async signup(@Body() signUpDto: SignupDto): Promise<{ token: string }> {
    try {
      return await this.authService.signup(signUpDto);
    } catch (error) {
      throw new HttpException(error.message || 'Signup failed', HttpStatus.BAD_REQUEST);
    }
  }

  @Post('/login')
  async login(@Body() loginDto: LoginDto): Promise<{ token: string }> {
    try {
      return await this.authService.login(loginDto);
    } catch (error) {
      throw new HttpException(error.message || 'Invalid credentials', HttpStatus.UNAUTHORIZED);
    }
  }

  @Post('verify')
  async verifyOtp(@Body(ValidationPipe) verifyOtpDto: VerifyOtpDto): Promise<{ token: string }> {
    try {      
      const token = await this.authService.verifyOtp(verifyOtpDto);
      return token
    } catch (error) {
      throw new HttpException(
        error.message || 'OTP verification failed',
        HttpStatus.BAD_REQUEST
      );
    }
  }
}
