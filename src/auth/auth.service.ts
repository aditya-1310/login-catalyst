import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { use } from 'passport';
import { User } from './schemas/user.schema';
import { Model } from 'mongoose';
import * as bcrypt from 'bcryptjs'
import { JwtService } from '@nestjs/jwt';
import { SignupDto } from './dto/signup.dto';
import { LoginDto } from './dto/login.dto';
import { ApiService } from 'src/api/api.service';
@Injectable()
export class AuthService {
    constructor(
        @InjectModel(User.name)
         private userModel:Model<User>,
         private jwtService :JwtService,
         private readonly apiService: ApiService
        ) {}

        async signup(signUpDto:SignupDto): Promise<{token:string}> {
         const {name,email,password,phone_number,gender}=signUpDto
         const hashedPassword=await bcrypt.hash(password,10)
         const user=await this.userModel.create({
            name,
            email,
            password:hashedPassword,
            phone_number,
            gender
         })

         // genrate a link and then 
         // random string; -> jwt
         // schema => otp/verify
         // otp, key, userid timestamp, exp 10mins
         // jwt 
         
        //  const result = await this.apiService.sendOtp(email, link);

         const token = this.jwtService.sign({ id:user._id})
         return{ token }
        }
        async login(loginDto:LoginDto):Promise<{token:string}>{
            const {email,password}=loginDto
            const user = await this.userModel.findOne({email})
            if(!user){
                throw new UnauthorizedException('Invalid credentials')

            }
            const ispasswordMatched=await bcrypt.compare(password,user.password)
            if(!ispasswordMatched){
                throw new UnauthorizedException('Invalid credentials')
            }
            const token = this.jwtService.sign({ id:user._id})
            return{ token }
        }


        // login with otp.
        //  const result = await this.apiService.sendOtp(email, otp);

}


