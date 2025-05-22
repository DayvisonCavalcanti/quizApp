import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Question } from './question.entity';
import { Quiz } from '../quiz/quiz.entity';

@Injectable()
export class QuestionService {
  constructor(
    @InjectRepository(Question)
    private questionRepository: Repository<Question>,
    @InjectRepository(Quiz)
    private quizRepository: Repository<Quiz>,
  ) {}

  // Criar uma questão
  async createQuestion(
    questionText: string,
    options: string[],
    correctAnswer: string,
    quizId: number,
  ): Promise<Question> {
    const quiz = await this.quizRepository.findOne({ where: { id: quizId } });
    if (!quiz) throw new NotFoundException('Quiz não encontrado');

    const question = this.questionRepository.create({
      question_text: questionText,
      options,
      correct_answer: correctAnswer,
      quiz, // Associa ao quiz encontrado
    });

    return this.questionRepository.save(question);
  }

  // Buscar todas as questões
  async getAllQuestions(): Promise<Question[]> {
    return this.questionRepository.find({ 
      relations: ['quiz'], // Carrega os dados do quiz
    });
  }
}