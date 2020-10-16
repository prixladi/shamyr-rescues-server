import countries from './countriesData.json';

const codes: { [id: string]: boolean } = {};

const initCountries = () => {
  countries.forEach((entry) => {
    codes[entry.code] = true;
  });
};

const existsByCode = (code: string) => {
  return codes[code];
};

export { initCountries, existsByCode };
