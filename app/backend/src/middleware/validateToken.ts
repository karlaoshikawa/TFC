import { Request, Response, NextFunction } from 'express';
import { validateToken } from '../auth/token';

export default class validToken {
  public checkToken = (req: Request, res: Response, next: NextFunction) => {
    const { authorization } = req.headers;

    if (!authorization) {
      return res.status(401).json({ message: 'Token not found' });
    }

    if (authorization.length < 16) {
      return res.status(401).json({ message: 'Token must be a valid token' });
    }
    const payload = validateToken(authorization);
    if (!payload) {
      return res.status(401).json({ message: 'Token must be a valid token' });
    }
    return next();
  };
}
