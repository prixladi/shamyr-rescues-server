import { User } from '..';
import { NewUserEntity, UserEntity } from '../entities/users';

const getOrCreate = async (entity: NewUserEntity): Promise<UserEntity> => {
  const [result] = await User.findOrCreate({ where: { id: entity.id }, defaults: entity });
  return result.get({ clone: true });
};

export { getOrCreate };
