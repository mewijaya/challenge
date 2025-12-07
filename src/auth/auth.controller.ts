import { BadRequestException, Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signin')
  async login(@Body() loginDto: LoginDto) {
    if (!loginDto)
      throw new BadRequestException('username and password required');

    return this.authService.signIn({
      username: loginDto.username,
      password: loginDto.password,
    });
  }
}
