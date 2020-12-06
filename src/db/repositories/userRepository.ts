import { User } from '..';
import { NewUserEntity, UserEntity } from '../entities/users';

const getOrCreate = async (entity: NewUserEntity): Promise<UserEntity> => {
  const [result] = await User.findOrCreate({ where: { id: entity.id }, defaults: entity });
  return result.get({ clone: true });
};

const getOne = async (id: string): Promise<UserEntity | null> => {
  const result = await User.findOne({ where: { id } });
  if (result === null) {
    return null;
  }

  return result.get({ clone: true });
};

export { getOne, getOrCreate };
