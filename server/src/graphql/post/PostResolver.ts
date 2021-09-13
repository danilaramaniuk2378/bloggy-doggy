import { Query, Resolver, Ctx, UseMiddleware, Mutation, Arg, InputType, Field } from 'type-graphql';
import { Post } from '../../entities/Post';
import { MyContext } from '../../MyContext';
import { isAuth } from '../isAuth';

@InputType()
class PostInput {
  @Field()
  title: string;
  @Field()
  text: string;
}

@Resolver(Post)
export class PostResolver {
  @Mutation(() => Post)
  @UseMiddleware(isAuth)
  createPost(@Arg('input') input: PostInput, @Ctx() { userId }: MyContext): Promise<Post> {
    return Post.create({
      ...input,
      creatorId: userId,
    }).save();
  }

  @Query(() => [Post])
  async posts(): Promise<Post[]> {
    return Post.find();
  }
}
