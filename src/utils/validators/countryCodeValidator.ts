import { existsByCode } from '../../data/countries';
import { CustomHelpers, ErrorReport } from 'joi';

const validate = (str: string, helpers: CustomHelpers): ErrorReport | boolean => {
  if (existsByCode(str)) return true;

  return helpers.message({ custom: `Country code '${str}' does not exist.` });
};

export default validate;
