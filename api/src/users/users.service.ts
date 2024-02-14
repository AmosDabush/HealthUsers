import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { IUser } from "./interfaces/user.interface";
import { CreateUserDto } from "src/auth/dto/create-user.dto";

@Injectable()
export class UsersService {
  constructor(@InjectModel("User") private userModel: Model<IUser>) {}

  async create(createUserDto: CreateUserDto): Promise<IUser> {
    const newUser = new this.userModel(createUserDto);
    return newUser.save();
  }

  async findByEmail(email: string): Promise<IUser | undefined> {
    return this.userModel.findOne({ email });
  }

  async findAll(): Promise<IUser[]> {
    return this.userModel.find().exec();
  }
}
