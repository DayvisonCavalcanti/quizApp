import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Result } from './result.entity';

@Injectable()
export class ResultService {
  constructor(
    @InjectRepository(Result)
    private resultRepository: Repository<Result>,
  ) {}

  // Criar um resultado para um quiz
  async createResult(userId: number, quizId: number, score: number): Promise<Result> {
    const result = this.resultRepository.create({
      user: { id: userId },
      quiz: { id: quizId },
      score,
      date: new Date(),
    });
    return this.resultRepository.save(result);
  }

  // Obter todos os resultados
  async getAllResults(): Promise<Result[]> {
    return this.resultRepository.find();
  }
}
