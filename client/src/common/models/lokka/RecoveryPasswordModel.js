import client from './client';

export default class RecoveryPasswordModel {
  static sendForgotEmail({ email }) {
    return client().mutate(`
        {
          sendForgotEmail(email: "${email}")
        }
    `);
  }

  static resetPassword({ recoveryToken, password }) {
    return client().mutate(`
        {
          resetPassword(recoveryToken: "${recoveryToken}", password: "${password}"){
            token,
            refreshToken
          }
        }
    `);
  }

  static isUserForRecoveryExist(recoveryToken) {
    const query = `
      {
        isUserForRecoveryExist(recoveryToken: "${recoveryToken}")
      }
    `;

    return client().query(query, { recoveryToken });
  }
}
