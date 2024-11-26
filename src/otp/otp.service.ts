import { Injectable } from '@nestjs/common';
import { randomInt } from 'crypto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Otp,OtpDocument } from './schemas/otp.schema';
import { ApiService } from 'src/api/api.service';

@Injectable()
export class OtpService {
  constructor(
    @InjectModel(Otp.name) private otpModel: Model<OtpDocument>,
    private apiService: ApiService,
  ) {}

  generateOtp(): string {
    return Math.floor(100000 + Math.random() * 900000).toString();
  }

  async sendOTPFunc(email: string): Promise<void> {
    try {
      // Delete any existing OTP for this email
      await this.otpModel.deleteMany({ email });

      const otp = this.generateOtp();
      console.log('Generated OTP:', { email, otp });

      const otpEntry = new this.otpModel({
        email,
        otp,
        createdAt: new Date()
      });

      await otpEntry.save();
      console.log('OTP saved to database:', otpEntry);

      await this.apiService.sendOtp(email, otp);
      console.log('OTP sent to email successfully');
    } catch (error) {
      console.error('Error in sendOTPFunc:', error);
      throw error;
    }
  }

  async validateOtp(email: string, otp: string): Promise<boolean> {
    try {
      console.log('Attempting to validate OTP:', { email, otp });

      const otpEntry = await this.otpModel.findOne({ 
        email,
        otp
      }).exec();

      console.log('Found OTP entry:', otpEntry);

      if (!otpEntry) {
        console.log('No matching OTP found in database');
        return false;
      }

      const tenMinutesAgo = new Date(Date.now() - 10 * 60 * 1000);
      console.log('OTP creation time:', otpEntry.createdAt);
      console.log('Current time:', new Date());
      console.log('Expiry threshold:', tenMinutesAgo);

      if (otpEntry.createdAt < tenMinutesAgo) {
        console.log('OTP has expired');
        await this.otpModel.deleteOne({ _id: otpEntry._id });
        return false;
      }

      // Valid OTP - delete it
      await this.otpModel.deleteOne({ _id: otpEntry._id });
      console.log('OTP validated successfully and deleted');
      return true;

    } catch (error) {
      console.error('Error in validateOtp:', error);
      return false;
    }
  }
}
