import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { HttpModule } from '@nestjs/axios';
import { ApiService } from './api/api.service';
import { OtpModule } from './otp/otp.module';
import { ApiModule } from './api/api.module';

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: '.env',
      isGlobal: true,
     }),
     MongooseModule.forRoot(process.env.MONGO_URI),
     AuthModule,
     HttpModule.register({
      timeout: 5000,
      maxRedirects: 5,
    }),
     OtpModule,
     ApiModule,
  ],
  controllers: [AppController],
  providers: [AppService, ApiService],
})
export class AppModule {}
