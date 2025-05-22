import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Result } from './result.entity';
import { User } from '../user/user.entity';
import { Quiz } from '../quiz/quiz.entity';

@Injectable()
export class ResultService {
  constructor(
    @InjectRepository(Result)
    private resultRepository: Repository<Result>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Quiz)
    private quizRepository: Repository<Quiz>,
  ) {}

  async createResult(userId: number, quizId: number, score: number): Promise<Result> {
    // Verifica se o usuário e o quiz existem
    const user = await this.userRepository.findOne({ where: { id: userId } });
    const quiz = await this.quizRepository.findOne({ where: { id: quizId } });

    if (!user || !quiz) {
      throw new NotFoundException('Usuário ou Quiz não encontrado');
    }

    const result = this.resultRepository.create({
      user,
      quiz,
      score,
      date: new Date(),
    });

    return this.resultRepository.save(result);
  }

  async getAllResults(): Promise<Result[]> {
    return this.resultRepository.find({ 
      relations: ['user', 'quiz'], // Carrega os dados do usuário e quiz
    });
  }
}