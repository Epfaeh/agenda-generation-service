import { cleanEnv, port, str } from 'envalid';

export const ValidateEnv = () => {
  cleanEnv(process.env, {
    NODE_ENV: str(),
    PORT: port(),
    OPENAI_API_KEY: str(),
    OPENAI_DEFAULT_MODEL: str(),
  });
};
