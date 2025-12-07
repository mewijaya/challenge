import { Injectable } from '@nestjs/common';
import { TypeOrmOptionsFactory, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';
import { User } from 'src/auth/models/user.model';
import { Score } from 'src/leaderboard/models/score.model';

@Injectable()
export class TypeOrmConfigService implements TypeOrmOptionsFactory {
  constructor(private config: ConfigService) {}

  createTypeOrmOptions(): TypeOrmModuleOptions {
    return {
      type: 'mysql',
      host: this.config.get('DB_HOST'),
      port: 3306,
      username: this.config.get('MYSQL_USER'),
      password: this.config.get('MYSQL_PASSWORD'),
      database: this.config.get('MYSQL_DATABASE'),
      entities: [User, Score],
      synchronize: true,
    };
  }
}
