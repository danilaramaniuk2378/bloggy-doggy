import {
  Resolver,
  Query,
  Mutation,
  Arg,
  ObjectType,
  Field,
  Ctx,
  UseMiddleware,
  Int,
} from 'type-graphql';
import { hash, compare } from 'bcryptjs';
import { getConnection } from 'typeorm';
import { User } from '../../entity/User';
import { MyContext } from '../../MyContext';
import { createAccessToken, createRefreshToken } from './auth';
import { isAuth } from '../isAuth';
import { sendRefreshToken } from '../../sendRefreshToken';

@ObjectType()
class LoginResponse {
  @Field()
  accessToken: string;
}

@Resolver()
export default class UserResolver {
  @Query(() => String)
  @UseMiddleware(isAuth)
  bye(@Ctx() { payload }: MyContext) {
    console.log(payload);
    return `your user id is ${payload!.userId}`;
  }

  @Mutation(() => Boolean)
  async revokeRefreshTokensForUser(@Arg('userId', () => Int) userId: number) {
    await getConnection().getRepository(User).increment({ id: userId }, 'tokenVersion', 1);

    return true;
  }

  @Query(() => [User])
  users() {
    return User.find();
  }

  @Mutation(() => LoginResponse)
  async login(
    @Arg('email') email: string,
    @Arg('password') password: string,
    @Ctx() { res }: MyContext
  ): Promise<LoginResponse> {
    const user = await User.findOne({ where: { email } });

    if (!user) {
      throw new Error('no such user');
    }

    const valid = await compare(password, user.password);

    if (!valid) {
      throw new Error('wrong password');
    }

    sendRefreshToken(res, createRefreshToken(user));

    return {
      accessToken: createAccessToken(user),
    };
  }

  @Mutation(() => Boolean)
  async register(@Arg('email') email: string, @Arg('password') password: string): Promise<boolean> {
    const hashedPassword = await hash(password, 12);

    try {
      await User.insert({
        email,
        password: hashedPassword,
      });
    } catch (err) {
      console.log(err);

      return false;
    }

    return true;
  }
}
