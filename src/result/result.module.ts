import { Module } from '@nestjs/common';
import { ResultController } from './result.controller';
import { ResultService } from './result.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Result } from './result.entity';
import { User } from '../user/user.entity'; // Importe User
import { Quiz } from '../quiz/quiz.entity'; // Importe Quiz

@Module({
  imports: [
    TypeOrmModule.forFeature([Result, User, Quiz]), // Adicione User e Quiz
  ],
  controllers: [ResultController],
  providers: [ResultService],
})
export class ResultModule {}