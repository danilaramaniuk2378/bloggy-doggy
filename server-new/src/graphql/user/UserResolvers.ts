import User, { ILocalUser, IUser } from './UserModel';
import { getTokens } from '../../helpers/get-tokens';
import { IContext } from '../types';

interface IAddUserArgs {
  email: ILocalUser['email'];
  password: ILocalUser['password'];
}

const resolvers = {
  signUp: async (obj: IUser, args: IAddUserArgs, { res }: IContext): Promise<boolean> => {
    const { email, password } = args;
    const foundUser = await User.findOne({ [`local.email`]: email });

    if (foundUser) {
      throw new Error('Email is already in use');
    }

    const newUser = new User({
      methods: ['local'],
      local: { email, password },
    });
    await newUser.save();

    const { accessToken, refreshToken } = getTokens(newUser);

    res.cookie('refresh-token', refreshToken);
    res.cookie('access-token', accessToken);

    return true;
  },
};

export default resolvers;
