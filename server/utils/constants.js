import jwt from 'jsonwebtoken';

export const TIMESTAMP = 'YYYY-MM-DD HH:mm:ss';

export class Token {
  static secret = 'express-graphql-template-v0';
  expiresIn = '1d';

  constructor({ user, overrideExpiration }) {
    if (overrideExpiration) {
      this.expiresIn = overrideExpiration;
    }
    if (!user) {
      console.error('Token::constructor::user_not_found');
      return;
    }
    this.user = user;
  }

  get() {
    const token = jwt.sign(
      {
        userId: this.user.id
      },
      this.secret,
      {
        expiresIn: this.expiresIn
      }
    );
    console.debug(`Token::get::${token}`);
    return token;
  }
}
