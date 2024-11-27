import { Controller, Post, Body, ValidationPipe } from '@nestjs/common';
import { OtpService } from './otp.service';
import { ApiService } from '../api/api.service';
import { VerifyOtpDto } from './dto/verify-otp.dto';
import { OtpDto } from './dto/otp.dto';

@Controller('otp')
export class OtpController {
  constructor(
    private readonly otpService: OtpService,
    private readonly apiService: ApiService
  ) {}


  @Post()
  async sendOtp(@Body() otpDto: OtpDto) {
    return this.otpService.sendOTPFunc(otpDto.email);
  }
  
}
