import { OneToMany, Entity, PrimaryGeneratedColumn, Column, BaseEntity } from 'typeorm';
import { ObjectType, Field, Int } from 'type-graphql';
import { Post } from './Post';

@ObjectType()
@Entity('users')
export class User extends BaseEntity {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column({ unique: true })
  username!: string;

  @Field()
  @Column({ unique: true })
  email!: string;

  @OneToMany(() => Post, (post: Post) => post.creator)
  posts: Post[];

  @Column()
  password!: string;

  @Column('int', { default: 0 })
  tokenVersion: number;
}
