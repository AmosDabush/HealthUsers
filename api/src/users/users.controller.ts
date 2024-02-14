import {
  Controller,
  Get,
  Param,
  NotFoundException,
  UseGuards,
} from "@nestjs/common";
import { UsersService } from "./users.service";
import { IUser } from "./interfaces/user.interface";
import { JwtAuthGuard } from "src/auth/guards/jwt-auth.guard";

@Controller("users")
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get(":email")
  async findByEmail(@Param("email") email: string): Promise<IUser> {
    const user = await this.usersService.findByEmail(email);
    if (!user) {
      throw new NotFoundException("User not found");
    }
    return user;
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  async findAll() {
    return this.usersService.findAll();
  }
}
