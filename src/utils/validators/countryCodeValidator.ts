import { existsByCode } from '../../data/countries';
import { CustomHelpers } from 'joi';

const validate = (str: string, helpers: CustomHelpers) => {
  if (existsByCode(str)) return true;

  return helpers.message({ custom: `Country code '${str}' does not exist.` });
};

export default validate;
