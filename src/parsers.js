import YAML from 'yaml';
import iniParse from './iniParser';

const parsers = {
  json: (data) => JSON.parse(data),
  yml: (data) => YAML.parse(data),
  // ini: (data) => INI.parse(data),
  ini: (data) => iniParse(data),
};

export default (data, type) => parsers[type](data);
