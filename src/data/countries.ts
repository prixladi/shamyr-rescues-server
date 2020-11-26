import countries from './countriesData.json';

const codes: { [id: string]: boolean } = {};

const initCountries = (): void => {
  countries.forEach((entry) => {
    codes[entry.code] = true;
  });
};

const existsByCode = (code: string): boolean => {
  return codes[code];
};

export { initCountries, existsByCode };
