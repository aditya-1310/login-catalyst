import { IsNotEmpty,IsString,IsNumber,IsEmail,MinLength } from 'class-validator';
export class SignupDto {
    @IsNotEmpty()
    @IsString()
   readonly name:string

   @IsNotEmpty()
   @IsEmail({},{message:"Please enter a valid email"})
   readonly email:string

    @IsNotEmpty()
    @IsString()
    @MinLength(6)
    readonly password:string

    @IsNotEmpty()
    @IsNumber()
    phone_number:number

    @IsNotEmpty()
    @IsString() 
    readonly gender:string
}