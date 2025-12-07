import { BadRequestException, Injectable } from '@nestjs/common';
import { UserService } from './user.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UserService,
    private jwtService: JwtService,
  ) {}

  async signIn({ username, password }: { username: string; password: string }) {
    const user = await this.usersService.findByUsername(username);
    if (!user) throw new BadRequestException('user not found');

    const passEqual = await bcrypt.compare(password, user.password);
    if (!passEqual) throw new BadRequestException('user not found');

    const payload = {
      sub: user.id.toString(),
      username: user.username,
      role: user.role,
    };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
