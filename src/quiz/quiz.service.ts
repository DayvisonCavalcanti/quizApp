import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Quiz } from './quiz.entity';
import { Question } from '../question/question.entity';

@Injectable()
export class QuizService {
  constructor(
    @InjectRepository(Quiz)
    private quizRepository: Repository<Quiz>,
    @InjectRepository(Question)
    private questionRepository: Repository<Question>,
  ) {}

  // Criar um novo quiz
  async createQuiz(title: string): Promise<Quiz> {
    const quiz = this.quizRepository.create({ title });
    return this.quizRepository.save(quiz);
  }

  // Obter todos os quizzes
  async getAllQuizzes(): Promise<Quiz[]> {
    return this.quizRepository.find({ relations: ['questions'] });
  }
}
