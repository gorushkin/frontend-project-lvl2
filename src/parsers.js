import YAML from 'yaml';
import INI from 'ini';

const parsers = {
  json: (data) => JSON.parse(data),
  yml: (data) => YAML.parse(data),
  ini: (data) => INI.parse(data),
};

export default (data, type) => parsers[type](data);
