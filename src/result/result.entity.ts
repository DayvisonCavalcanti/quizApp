import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { User } from '../user/user.entity';
import { Quiz } from '../quiz/quiz.entity';

@Entity()
export class Result {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.results) // Relação corrigida
  user: User;

  @ManyToOne(() => Quiz, (quiz) => quiz.results) // Relação corrigida
  quiz: Quiz;

  @Column()
  score: number;

  @Column()
  date: Date;
}