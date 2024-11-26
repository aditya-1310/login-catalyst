import { IsNotEmpty, IsString, IsEmail, MinLength, Matches, IsEnum } from 'class-validator';

export class SignupDto {
    @IsNotEmpty({ message: "Name is required" })
    @IsString({ message: "Name must be a string" })
    readonly name: string;

    @IsNotEmpty({ message: "Email is required" })
    @IsEmail({}, { message: "Please enter a valid email address" })
    readonly email: string;

    @IsNotEmpty({ message: "Password is required" })
    @IsString({ message: "Password must be a string" })
    @MinLength(6, { message: "Password must be at least 6 characters long" })
    readonly password: string;

    @IsNotEmpty({ message: "Phone number is required" })
    @Matches(/^\d{10}$/, { message: "Phone number must be a 10-digit number" })
    readonly phone_number: number;

    @IsNotEmpty({ message: "Gender is required" })
    @IsEnum(['Male', 'Female', 'Other'], { message: "Gender must be 'Male', 'Female', or 'Other'" })
    readonly gender: string;
}
