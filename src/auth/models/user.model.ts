import { Score } from 'src/leaderboard/models/score.model';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  username: string;

  @Column()
  name: string;

  @Column()
  password: string;

  @Column({ default: 'user' })
  role: 'user' | 'admin';

  @OneToMany(() => Score, (score) => score.user)
  scores: Score[];
}
