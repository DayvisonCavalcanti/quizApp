import { Module } from '@nestjs/common';
import { QuizController } from './quiz.controller';
import { QuizService } from './quiz.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Quiz } from './quiz.entity';
import { Question } from '../question/question.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Quiz, Question])],
  controllers: [QuizController],
  providers: [QuizService],
})
export class QuizModule {}