import { Controller, Get, Post, Body } from '@nestjs/common';
import { QuizService } from './quiz.service';

@Controller('quizzes')
export class QuizController {
  constructor(private readonly quizService: QuizService) {}

  @Post('create')
  async createQuiz(@Body() body: { title: string }) {
    return this.quizService.createQuiz(body.title);
  }

  @Get()
  async getAllQuizzes() {
    return this.quizService.getAllQuizzes();
  }
}
