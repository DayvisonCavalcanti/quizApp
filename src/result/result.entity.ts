import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { User } from '../user/user.entity';
import { Quiz } from '../quiz/quiz.entity';

@Entity()
export class Result {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User)
  user: User;

  @ManyToOne(() => Quiz)
  quiz: Quiz;

  @Column()
  score: number;

  @Column()
  date: Date;
}
