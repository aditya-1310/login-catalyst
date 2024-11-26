import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Otp, OtpSchema } from './schemas/otp.schema';
import { OtpService } from './otp.service';
import { OtpController } from './otp.controller';
import { ApiModule } from '../api/api.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Otp.name, schema: OtpSchema }]),
    ApiModule
  ],
  controllers: [OtpController],
  providers: [OtpService],
  exports: [OtpService], // Export if needed by other modules
})
export class OtpModule {}
