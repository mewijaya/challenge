import {
  Controller,
  Get,
  Post,
  Body,
  UseGuards,
  Request,
  BadRequestException,
} from '@nestjs/common';
import { LeaderboardService } from './leaderboard.service';
import { SubmitScoreDto } from './dto/submit-score.dto';
import { AuthGuard } from 'src/auth/guard/auth.guard';
import { Role } from 'src/auth/enums/roles.enum';

@Controller('leaderboard')
export class LeaderboardController {
  constructor(private readonly leaderboardService: LeaderboardService) {}

  @Post('submit-score')
  @UseGuards(AuthGuard)
  submitScore(@Request() req, @Body() submitScoreDto: SubmitScoreDto) {
    let userId;
    if (req.user.role == Role.ADMIN) {
      if (!submitScoreDto.userId)
        throw new BadRequestException('userId is required');

      userId = submitScoreDto.userId;
    } else {
      if (!req.user.sub) throw new BadRequestException('userId is required');
      userId = parseInt(req.user.sub);
    }

    return this.leaderboardService.submit({
      id: userId,
      score: submitScoreDto.score,
    });
  }

  @Get()
  findAll() {
    return this.leaderboardService.getLeaderboard({});
  }
}
