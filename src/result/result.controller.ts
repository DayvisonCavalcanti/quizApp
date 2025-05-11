import { Controller, Post, Get, Body } from '@nestjs/common';
import { ResultService } from './result.service';

@Controller('results')
export class ResultController {
  constructor(private readonly resultService: ResultService) {}

  @Post('create')
  async createResult(@Body() body: { userId: number; quizId: number; score: number }) {
    return this.resultService.createResult(body.userId, body.quizId, body.score);
  }

  @Get()
  async getAllResults() {
    return this.resultService.getAllResults();
  }
}
