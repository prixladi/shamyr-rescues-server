import { Application, NextFunction, Request, Response } from 'express';
import { getConfig } from '../tokenService/tokenFetcher';
import jwt, { JsonWebTokenError } from 'jsonwebtoken';
import { UNAUTHORIZED } from 'http-codes';
import { userRepository } from '../../db/repositories';
import { UserEntity } from '../../db/entities/users';

const tokenType = 'Bearer';

type PayloadType = {
  iat: number;
  jti: string;
  'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name': string;
  'http://schemas.xmlsoap.org/ws/2009/09/identity/claims/actor': string;
  'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress': string;
  grant: string;
  'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/givenname': string;
  'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/surname': string;
  nbf: string;
  exp: string;
  iss: string;
  aud: string;
};

const getToken = (req: Request) => {
  const token = req.header('Authorization');
  return token && token.startsWith(tokenType) && token.substring(tokenType.length + 1);
};

const createPublicKey = (infoKey: string) => `-----BEGIN PUBLIC KEY-----\n${infoKey}\n-----END PUBLIC KEY-----`;

const handleAuth = async (req: Request, res: Response, next: NextFunction) => {
  const config = getConfig();
  if (!config) throw new Error('Unable to retrieve token config.');

  const token = getToken(req);

  if (!token) {
    return res.sendStatus(UNAUTHORIZED);
  }

  try {
    const result = jwt.verify(token, createPublicKey(config.publicKey), {
      issuer: config.issuer,
      audience: config.audience,
      algorithms: [config.signatureAlgorithm],
    }) as PayloadType;

    const user = await userRepository.getOrCreate({ id: result['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name'] });
    req.app.set('user', user);
  } catch (err) {
    if (err instanceof JsonWebTokenError) return res.sendStatus(UNAUTHORIZED);

    throw err;
  }

  next();
};

const getCurrentUser = (reqProps: Application) => {
  const user = reqProps.get('user') as UserEntity | null;
  if (!user) {
    throw new Error('Unable to retrieve user from current context.');
  }

  return user;
};

export { handleAuth, getCurrentUser };
