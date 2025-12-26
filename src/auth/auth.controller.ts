/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable prettier/prettier */
import {  Controller, Request, Post, Body, Patch} from '@nestjs/common';
import { AuthService } from './auth.service';

class LoginDto {
  email: string;
  password: string;
}

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  async login(@Body() body: LoginDto) {
    const user = await this.authService.validateUser(body.email, body.password);
    if (!user) throw new Error('Invalid credentials');
    return this.authService.login(user);
  }

  @Post('register')
  async register(@Body() body: any) {
    return this.authService.register(body);
  }

  // --- NEW FIREBASE ROUTE ---
  @Post('firebase-login')
  async firebaseLogin(@Body('token') token: string) {
    return await this.authService.loginWithFirebase(token);
  }

    // 1. Request Reset Link
  @Post('reset-password-request')
  async requestReset(@Body('email') email: string) {
    return this.authService.createResetToken(email);
  }

  // 2. Perform Reset
  @Patch('reset-password')
  async resetPassword(@Body() body: any) {
    return this.authService.resetPassword(body.token, body.newPassword);
  }
  // ---------------------------
}