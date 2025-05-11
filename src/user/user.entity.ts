import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;  // Para sistemas de autenticação locais, mas aqui não será usado no Firebase

  @Column()
  name: string;
}
