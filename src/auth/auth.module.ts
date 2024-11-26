import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { Mongoose } from 'mongoose';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from './schemas/user.schema';
import { Passport } from 'passport';
import { PassportModule } from '@nestjs/passport';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { ApiModule } from '../api/api.module';
import { OtpModule } from 'src/otp/otp.module';

@Module({
  imports: [
    PassportModule.register({defaultStrategy: 'jwt'}),
    JwtModule.registerAsync({
      inject:[ConfigService],
      useFactory:(config:ConfigService)=>{
        return {
          secret: config.get('JWT_SECRET'),
          signOptions: {
            expiresIn:config.get<string | number>('JWT_EXPIRES'),
          },
        };
      },
    }),
    MongooseModule.forFeature([{name: 'User', schema: UserSchema}]), ApiModule, OtpModule
  ],
  controllers: [AuthController],
  providers: [AuthService]
})
export class AuthModule {}
