import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: {
      allowedHeaders: ["content-type", "Accept", "Authorization"],
      origin: "*",
      credentials: true,
    },
  });
  app.setGlobalPrefix("api");
  await app.listen(process.env.SERVER_PORT || 3000);
}
bootstrap();
