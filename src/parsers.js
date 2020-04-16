import YAML from 'yaml';
import iniParse from './iniParser';

const parsers = {
  json: JSON.parse,
  yml: YAML.parse,
  ini: iniParse,
};

export default (data, type) => parsers[type](data);
