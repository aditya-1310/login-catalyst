import { Injectable } from '@nestjs/common';
import { randomInt } from 'crypto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Otp,OtpDocument } from './schemas/otp.schema';
import { ApiService } from 'src/api/api.service';

@Injectable()
export class OtpService {
  constructor(
    @InjectModel('Otp') private readonly otpModel: Model<OtpDocument>,
    private readonly apiService: ApiService

  ) {}

  generateOtp(): string {
    return randomInt(100000, 999999).toString(); // 6-digit OTP
  }
  async saveOtp(userId: string, otp: string): Promise<void> {
    const otpEntry = new this.otpModel({ userId, otp, createdAt: new Date() });
    await otpEntry.save();
  }

  async sendOTPFunc(userId: any, email: string): Promise<void> {
    const otp = this.generateOtp();
    const otpEntry = new this.otpModel({ userId, otp, createdAt: new Date() });
    this.apiService.sendOtp(email, otp);
    await otpEntry.save();
  }

  async validateOtp(userId: string, otp: string): Promise<boolean> {
    const otpEntry = await this.otpModel.findOne({ userId, otp });
    if (!otpEntry) {
      return false; // OTP not found
    }

    // Check if OTP is expired (10 minutes)
    const isExpired = (new Date().getTime() - otpEntry.createdAt.getTime()) > 10 * 60 * 1000;
    if (isExpired) {
      await otpEntry.deleteOne(); // Delete expired OTP
      return false;
    }

    await otpEntry.deleteOne(); // Delete OTP after successful validation
    return true; // OTP is valid
  }
}
