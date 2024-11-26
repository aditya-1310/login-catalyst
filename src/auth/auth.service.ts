import * as bcrypt from 'bcrypt';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './schemas/user.schema';
import { SignupDto } from './dto/signup.dto';
import { LoginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';
import { HttpException, HttpStatus } from '@nestjs/common';
import { OtpService } from 'src/otp/otp.service';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel('User') private readonly userModel: Model<User>,
    private jwtService: JwtService,
    private readonly otpService: OtpService,
  ) {}

  async signup(signUpDto: SignupDto): Promise<{ token: string }> {
    const { password, ...rest } = signUpDto;

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const user = await this.userModel.create({ ...rest, password: hashedPassword });

    // Generate a JWT token
    const token = this.jwtService.sign({ userId: user._id, email: user.email });

    return { token };
  }

  

  async login(loginDto: LoginDto): Promise<{ token: string }> {
    const { email, password } = loginDto;
  
    // Find the user by email
    const user = await this.userModel.findOne({ email });
    if (!user) {
      throw new HttpException('User with the provided email does not exist.', HttpStatus.NOT_FOUND);
    }
  
    // Compare passwords
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new HttpException('Incorrect password.', HttpStatus.UNAUTHORIZED);
    }

    await this.otpService.sendOTPFunc(user._id, user.email);
  
    // Generate JWT token
    const token = this.jwtService.sign({ userId: user._id, email: user.email });
  
    return { token };
  }
  
  
}
