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

  // Criar uma nova questão
  async createQuestion(
    questionText: string, 
    options: string[], 
    correctAnswer: string, 
    quizId: number
  ): Promise<Question> {
    // Verificando se o Quiz com o id passado existe
    const quiz = await this.quizRepository.findOne({ where: { id: quizId } });

    if (!quiz) {
      throw new NotFoundException('Quiz não encontrado');  // Lançando um erro se o Quiz não existir
    }

    // Criando a questão e associando com o Quiz
    const question = this.questionRepository.create({
      question_text: questionText, 
      options, 
      correct_answer: correctAnswer, 
      quiz: quiz,  // Passando o Quiz encontrado diretamente aqui
    });

    // Salvando e retornando a nova questão
    return this.questionRepository.save(question);
  }
}
