import { Injectable } from '@nestjs/common';
import { User } from './models/user.model';
import { Role } from './enums/roles.enum';
import * as bcrypt from 'bcrypt';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private users: Repository<User>,
  ) {}

  async findByUsername(username: string) {
    return this.users.findOne({ where: { username } });
  }

  async create(username: string, name: string, password: string, role: Role) {
    const passwordHash = await bcrypt.hash(password, 10);
    const user = this.users.create({
      username,
      name,
      password: passwordHash,
      role,
    });
    return this.users.save(user);
  }

  async seed() {
    console.log('seed');
    await this.create('pain', 'pain', '12345', Role.ADMIN);
    await this.create('akatsuki', 'akatsuki', '12345', Role.USER);
    await this.create('madara', 'madara', '12345', Role.USER);
  }
}
