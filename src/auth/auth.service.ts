/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/require-await */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import { Injectable, UnauthorizedException, BadRequestException, NotFoundException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  // 1. VALIDATE USER (Local Strategy)
  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.usersService.findByEmail(email);
    // User must exist and have a password (social users might not have one)
    if (user && user.password && (await bcrypt.compare(pass, user.password))) {
      const { password, ...result } = user.toObject();
      return result;
    }
    return null;
  }

  // 2. GENERATE JWT (Login)
  async login(user: any) {
    const payload = { email: user.email, sub: user._id };
    return {
      access_token: this.jwtService.sign(payload),
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        image: user.image,
        university: user.university,
        address: user.address
      }
    };
  }

  // 3. REGISTER NEW USER
  async register(data: any) {
    // Check if user exists
    const existingUser = await this.usersService.findByEmail(data.email);
    if (existingUser) {
      throw new BadRequestException('User with this email already exists');
    }

    const hashedPassword = await bcrypt.hash(data.password, 10);
    const user = await this.usersService.create({ ...data, password: hashedPassword });
    return this.login(user);
  }

  // 4. FIREBASE LOGIN (Social Media)
  async loginWithFirebase(firebaseToken: string) {
    try {
      // NOTE: In a real production app with a Service Account, you use:
      // const decodedToken = await admin.auth().verifyIdToken(firebaseToken);
      
      // For this setup (Client-side token), we decode it to get user info.
      // We are decoding the JWT manually here to avoid "Service Account" configuration errors 
      // for your current stage, but in production, verify the signature!
      const decodedToken = this.decodeFirebaseToken(firebaseToken);

      if (!decodedToken.email) {
        throw new BadRequestException('Invalid Token: No email found');
      }

      // Check if user exists in MongoDB
      let user = await this.usersService.findByEmail(decodedToken.email);

      // If not, create them (Auto-Register)
      if (!user) {
        user = await this.usersService.create({
          email: decodedToken.email,
          name: decodedToken.name || 'Social User',
          image: decodedToken.picture || 'https://ui-avatars.com/api/?name=User',
          googleId: decodedToken.uid, // Storing Firebase UID
          password: "", // No password for social users
        });
      }

      // Generate App JWT
      return this.login(user);

    } catch (e) {
      console.error(e);
      throw new UnauthorizedException("Social Login Failed");
    }
  }

  // 5. PASSWORD RESET - REQUEST
  async createResetToken(email: string) {
    const user = await this.usersService.findByEmail(email);
    if (!user) throw new NotFoundException('Email not found');
    
    // Create a short-lived token (15 mins) specifically for resetting
    const payload = { email: user.email, sub: user._id, type: 'reset' };
    const token = this.jwtService.sign(payload, { expiresIn: '15m' });
    
    // Return token (In real app, email this link)
    return { 
      message: "Reset link generated", 
      token: token 
    }; 
  }

  // 6. PASSWORD RESET - EXECUTE
  async resetPassword(token: string, newPassword: string) {
    try {
      // Verify the token
      const payload = this.jwtService.verify(token);
      
      if (payload.type !== 'reset') {
        throw new UnauthorizedException('Invalid token type');
      }
      
      const hashedPassword = await bcrypt.hash(newPassword, 10);
      
      // Update User
      await this.usersService.update(payload.sub, { password: hashedPassword });
      
      return { message: "Password updated successfully" };
    } catch (e) {
      throw new UnauthorizedException('Invalid or expired reset token');
    }
  }

  // --- Helper to decode Firebase JWT without Admin SDK (for ease of use) ---
  private decodeFirebaseToken(token: string) {
    try {
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const jsonPayload = decodeURIComponent(
        atob(base64)
          .split('')
          .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
          .join('')
      );
      return JSON.parse(jsonPayload);
    } catch (e) {
      throw new Error("Failed to parse token");
    }
  }
}