import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Score } from './models/score.model';
import { User } from 'src/auth/models/user.model';

@Injectable()
export class LeaderboardService {
  constructor(
    @InjectRepository(Score)
    private scores: Repository<Score>,
    @InjectRepository(User)
    private users: Repository<User>,
  ) {}

  async submit({ id, score }: { id: number; score: number }) {
    const user = await this.users.findOne({ where: { id: id } });
    if (!user) throw new BadRequestException('User not found');

    const scoreObject = this.scores.create({
      userId: id,
      score: score,
    });

    return this.scores.save(scoreObject);
  }

  async getLeaderboard({ limit = 10 }: { limit?: number }) {
    const qb = this.scores
      .createQueryBuilder('score')
      .select('MAX(score.score)', 'score_score')
      .addSelect('user.name', 'user_name')
      .innerJoin('score.user', 'user')
      .groupBy('user.id')
      .orderBy('score_score', 'DESC')
      .limit(limit);

    return qb.getRawMany();
  }
}
