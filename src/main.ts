import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { UserService } from './auth/user.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // const usersService = app.get(UserService);

  // await usersService.seed();
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
