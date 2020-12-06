import { NextFunction, Request, Response } from 'express';
import { FORBIDDEN, NOT_FOUND } from 'http-codes';
import { getCurrentUser } from '../../../../auth/handlers';
import { placeRepository } from '../../../../db/repositories';
import { PlaceIdParmasModel } from './models';

const handleCurrentUserResource = async (
  req: Request<PlaceIdParmasModel>,
  res: Response,
  next: NextFunction,
): Promise<Response<void> | undefined> => {
  const user = getCurrentUser(req.app);
  const result = await placeRepository.getOne(req.params.placeId);

  if (!result) {
    return res.sendStatus(NOT_FOUND);
  }
  if (result.userId != user.id) {
    return res.sendStatus(FORBIDDEN);
  }

  next();
};

export { handleCurrentUserResource };
