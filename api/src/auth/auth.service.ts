// src/auth/auth.service.ts
import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { UsersService } from "../users/users.service";
import * as bcrypt from "bcrypt";
import { CreateUserDto } from "./dto/create-user.dto";

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService
  ) {}

  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.usersService.findByEmail(email);
    if (user && bcrypt.compareSync(pass, user.password)) {
      const { password, ...result } = user.toObject();
      return result;
    }
    return null;
  }

  async login(user: any) {
    console.log({ user });

    const payload = { email: user.email };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async register(
    createUserDto: CreateUserDto
  ): Promise<{ access_token: string }> {
    const user = await this.usersService.create(createUserDto);
    const payload = { email: user.email, sub: user.id }; // Ensure the payload matches your JWT strategy

    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
