import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class ApiService {
  constructor(private readonly httpService: HttpService) {}

  async sendOtp(to: string, otp: string): Promise<void> {
    const url = 'http://techsprint.lpu.in:3004/send-mail';
    const payload = {
      to: [to],
      fromName: 'Innovation Studio LPU',
      subject: 'Your OTP Code',
      text: `Your OTP code is: ${otp}`,
      html: `<h1>Your OTP code is: ${otp}</h1>`,
    };

    const headers = {
      Authorization: process.env.Message_service_token,
      'Content-Type': 'application/json',
    };

    try {
      const response = await firstValueFrom(
        this.httpService.post(url, payload, { headers })
      );
    } catch (error) {
      console.error('Error sending OTP:', error);
      throw error;
    }
  }

  
}
