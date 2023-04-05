import * as jwt from 'jsonwebtoken';
import { Request, Response } from 'express';
import * as bcrypt from 'bcryptjs';
import { createToken } from '../auth/token';
import UsersService from '../services/UsersService';

export default class UsersController {
  constructor(private usersService = new UsersService()) { }

  public makeLogin = async (req: Request, res: Response) => {
    const { email, password } = req.body;
    const result = await this.usersService.makeLogin({ email, password });
    const validatePassword = bcrypt.compareSync(password, result?.password || '');
    if (!validatePassword) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }
    if (result) {
      const token = createToken(result);
      return res.status(200).json({ token });
    }

    return res.status(401).json({ message: 'nao sei oq escrever aqui...' });
  };

  public loginRole = async (req: Request, res: Response) => {
    const { authorization } = req.headers;
    const user = jwt.decode(authorization || '') as { payload: { role: string } };
    return res.status(200).json({ role: user?.payload.role });
  };
}
