import { readFileSync } from "fs";
import * as yaml from "js-yaml";
import { join } from "path";

const YAML_CONFIG_FILE_NAME = "config.yaml"

const config = () => {
  return yaml.load(
    readFileSync(join(__dirname, YAML_CONFIG_FILE_NAME), 'utf-8'),
  ) as Record<string, any>
}

export default config;