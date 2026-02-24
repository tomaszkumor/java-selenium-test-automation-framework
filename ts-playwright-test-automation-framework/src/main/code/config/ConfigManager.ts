import * as fs from "fs";
import * as yaml from "js-yaml";
import path from 'path';

export class ConfigManager {
  private readonly config: Record<string, any> = {};

  constructor(fileName: string) {
    this.loadFileSettings(fileName);
  }

  public loadFileSettings(fileName: string): void {
    try {
      const fileContent = fs.readFileSync(fileName, "utf8");
      const loadedYaml = yaml.load(fileContent) as Record<string, any> | undefined;

      if (loadedYaml) {
        this.updateMap(this.config, loadedYaml);
      }
    } catch (e) {
      console.warn(`Cannot load file ${fileName}:`, (e as Error).message);
      throw new Error("Failed to load configuration");
    }
  }

  private updateMap(destMap: Record<string, any>, sourceMap: Record<string, any>): void {
    Object.entries(sourceMap).forEach(([key, sourceValue]) => {
      const destValue = destMap[key];

      if (this.isObject(sourceValue) && this.isObject(destValue)) {
        this.updateMap(destValue, sourceValue);
      } else {
        destMap[key] = sourceValue;
      }
    });
  }

  private findProperty(config: Record<string, any>, propertyName: string): string | null {
    const dotPos = propertyName.indexOf(".");

    if (dotPos < 0) {
      const value = config[propertyName];
      return value !== undefined ? String(value) : null;
    }

    const key = propertyName.substring(0, dotPos);
    const remainder = propertyName.substring(dotPos + 1);
    const subMap = this.getSubMap(config, key);

    return subMap ? this.findProperty(subMap, remainder) : null;
  }

  private getSubMap(config: Record<string, any>, key: string): Record<string, any> | null {
    const value = config[key];
    return this.isObject(value) ? value : null;
  }

  private isObject(value: unknown): value is Record<string, any> {
    return typeof value === "object" && value !== null && !Array.isArray(value);
  }

  public getProperty(propertyName: string): string | null {
    const envKey = propertyName.toUpperCase().replace(/\./g, "_");
    const envValue = process.env[envKey];
    if (envValue !== undefined) return envValue;

    return this.findProperty(this.config, propertyName);
  }
}

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
