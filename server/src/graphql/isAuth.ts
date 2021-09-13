import { MiddlewareFn } from 'type-graphql';
import { MyContext } from '../MyContext';

export const isAuth: MiddlewareFn<MyContext> = ({ context }, next) => {
  if (context.userId === -1) {
    throw new Error('not authenticated');
  }

  return next();
};
