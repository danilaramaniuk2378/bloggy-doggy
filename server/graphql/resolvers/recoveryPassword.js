import { v4 } from 'uuid';
import { getTokens } from '../../helpers/auth';
import { sendForgotEmail as sendForgotEmailSendGrid } from '../../helpers/email';
import {
  LOCAL,
} from '../../constants/auth';

export const sendForgotEmail = async (
  parent,
  { email },
  { models, host }
) => {
  const user = await models.User.findOne({ [`${LOCAL}.email`]: email });

  if (user === null) {
    throw new Error('No such user with this email');
  }

  const token = v4();

  user.resetPasswordToken = token;
  user.resetPasswordExpires = Date.now() + 3600000; // 1 hour

  await user.save();
  await sendForgotEmailSendGrid(email, host, token);

  return token;
};

export const resetPassword = async (
  parent,
  { recoveryToken, password },
  { models, JWT_SECRET }
) => {
  const user = await models.User.findOne(
    {
      resetPasswordToken: recoveryToken,
      resetPasswordExpires: {
        $gt: Date.now(),
      },
    }
  );

  if (user === null) {
    throw new Error('PASSWORD_TOKEN_INVALID');
  }

  user[LOCAL].password = password;
  user.resetPasswordToken = undefined;
  user.resetPasswordExpires = undefined;

  await user.save();
  const res = await getTokens(user, JWT_SECRET);
  return res;
};

export const isUserForRecoveryExist = async (
  parent,
  { recoveryToken },
  { models }
) => {
  const user = await models.User.findOne(
    {
      resetPasswordToken: recoveryToken,
      resetPasswordExpires: {
        $gt: Date.now(),
      },
    });

  return !!user;
};
