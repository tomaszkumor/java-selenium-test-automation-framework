import fs from 'fs';
import path from 'path';
import yaml from 'js-yaml';

type WebConfig = {
  engine: string;
  remote: boolean;
  debug: boolean;
  headless: boolean;
};

type ApiConfig = {
  debug: boolean;
};

export type AppConfig = {
  environment: string;
  platform: 'web' | 'api';
  web: WebConfig;
  api: ApiConfig;
};

const toBoolean = (value: string | undefined, defaultValue: boolean) => {
  if (value === undefined) return defaultValue;
  return value.toLowerCase() === 'true';
};

export function loadConfig(): AppConfig {
  const filePath = path.resolve(process.cwd(), 'src/main/resources/BasicSettings.yaml');
  const fileContents = fs.readFileSync(filePath, 'utf8');

  const yamlConfig = yaml.load(fileContents) as AppConfig;

  const config: AppConfig = {
    environment: process.env.ENV ?? yamlConfig.environment,
    platform: (process.env.PLATFORM as 'web' | 'api') ?? yamlConfig.platform,

    web: {
      engine: process.env.WEB_ENGINE ?? yamlConfig.web.engine,
      remote: toBoolean(process.env.WEB_REMOTE, yamlConfig.web.remote),
      debug: toBoolean(process.env.WEB_DEBUG, yamlConfig.web.debug),
      headless: toBoolean(process.env.WEB_HEADLESS, yamlConfig.web.headless),
    },

    api: {
      debug: toBoolean(process.env.API_DEBUG, yamlConfig.api.debug),
    },
  };

  return config;
}