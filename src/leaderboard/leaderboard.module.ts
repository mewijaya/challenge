import { Module } from '@nestjs/common';
import { LeaderboardService } from './leaderboard.service';
import { LeaderboardController } from './leaderboard.controller';
import { Score } from './models/score.model';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/auth/models/user.model';

@Module({
  imports: [TypeOrmModule.forFeature([Score, User])],
  controllers: [LeaderboardController],
  providers: [LeaderboardService],
})
export class LeaderboardModule {}
