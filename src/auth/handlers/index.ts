import { Application, NextFunction, Request, Response } from 'express';
import { UNAUTHORIZED } from 'http-codes';
import { userRepository } from '../../db/repositories';
import { UserEntity } from '../../db/entities/users';
import { validateToken } from '../tokenService';

const tokenType = 'Bearer';

const getToken = (req: Request) => {
  const token = req.header('Authorization');
  return token && token.startsWith(tokenType) && token.substring(tokenType.length + 1);
};

const handleAuth = async (req: Request, res: Response, next: NextFunction): Promise<Response<void> | undefined> => {
  const token = getToken(req);
  if (!token) {
    return res.sendStatus(UNAUTHORIZED);
  }

  const payload = validateToken(token);
  if (!payload) {
    return res.sendStatus(UNAUTHORIZED);
  }

  const user = await userRepository.getOne(payload.name);
  req.app.set('user', user);
  next();
};

const getCurrentUser = (reqProps: Application): UserEntity => {
  const user = reqProps.get('user') as UserEntity | null;
  if (!user) {
    throw new Error('Unable to retrieve user from current context.');
  }

  return user;
};

export { handleAuth, getCurrentUser };
