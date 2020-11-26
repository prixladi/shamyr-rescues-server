import fetch from 'node-fetch';
import { Algorithm } from 'jsonwebtoken';
import { authConfig } from '../../configs';
import { delay } from '../../utils/promise';

type TokenConfig = {
  publicKey: string;
  issuer: string;
  audience: string;
  signatureAlgorithm: Algorithm;
};

let config: TokenConfig | null = null;

const startConfigFetchLoop = async (): Promise<never> => {
  while (true) {
    const newConfig = await tryFetchConfig();
    let delayMs: number;

    if (!newConfig && !config) delayMs = 20 * 1000;
    else if (!newConfig) delayMs = 5 * 60 * 1000;
    else {
      config = newConfig;
      delayMs = 60 * 60 * 1000;
    }
    await delay(delayMs);
  }
};

const getConfig = (): TokenConfig | null => config;

const tryFetchConfig = async (): Promise<TokenConfig | null> => {
  try {
    const result = await fetch(`${authConfig.authorityServiceUrl}/api/v1/token/configuration`);
    if (result.status >= 300) throw new Error(`Unexpected status ${result.status}.`);

    console.log('Successfuly fetched new token configuration.');
    return (await result.json()) as TokenConfig;
  } catch (err) {
    console.log('Error while fetching token configuration.');
    console.error(err);
    return null;
  }
};

export { getConfig };
export default startConfigFetchLoop;
