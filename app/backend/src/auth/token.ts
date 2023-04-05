import * as jwt from 'jsonwebtoken';
import { ILogin } from '../interfaces/ILogin';

const secret: string = process.env.JWT_SECRET || 'secret';

export const createToken = (payload: ILogin) => jwt.sign({ payload }, secret, {
  algorithm: 'HS256',
  expiresIn: '7d',
});

export const validateToken = (token: string) => jwt.verify(token, secret);
