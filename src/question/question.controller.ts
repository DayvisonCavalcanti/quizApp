// question.controller.ts
import { Controller, Get, Post, Body } from '@nestjs/common';
import { QuestionService } from './question.service';

@Controller('questions')
export class QuestionController {
  constructor(private readonly questionService: QuestionService) {}

  @Post('create')
  async createQuestion(
    @Body() body: { questionText: string; options: string[]; correctAnswer: string; quizId: number },
  ) {
    return this.questionService.createQuestion(
      body.questionText,
      body.options,
      body.correctAnswer,
      body.quizId,
    );
  }

  // ✅ Endpoint para listar todas as questões
  @Get() // Decorator obrigatório!
  async getAllQuestions() {
    return this.questionService.getAllQuestions();
  }
}