import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { AuthModule } from "./auth/auth.module";
import { ConfigModule } from "@nestjs/config";
import { UsersModule } from "./users/users.module";
import { MongooseModule } from "@nestjs/mongoose";

@Module({
  imports: [
    AuthModule,
    UsersModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRoot("mongodb://mongo:27017", {
      dbName: "health",
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
