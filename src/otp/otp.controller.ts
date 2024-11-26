import { Controller, Post, Body } from '@nestjs/common';
import { OtpService } from './otp.service';
import { ApiService } from '../api/api.service';

@Controller('otp')
export class OtpController {
  constructor(
    private readonly otpService: OtpService,
    private readonly apiService: ApiService
    
  ) {}

  @Post('send')
  async sendOtp(@Body('userId') userId: string, @Body('email') email: string): Promise<string> {
    const otp = this.otpService.generateOtp();
    await this.otpService.saveOtp(userId, otp);
    await this.apiService.sendOtp(email, otp);
    return 'OTP sent successfully';
  }

  @Post('verify')
  async verifyOtp(@Body('userId') userId: string, @Body('otp') otp: string): Promise<string> {
    const isValid = await this.otpService.validateOtp(userId, otp);
    if (isValid) {
      return 'OTP verified successfully';
    }
    return 'Invalid or expired OTP';
  }
}
