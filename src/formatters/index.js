import renderFullDiff from './renderFullDiff';
import renderPlainDiff from './renderPlainDiff';
import renderJsonDiff from './renderJsonDiff';

const formatters = {
  full: renderFullDiff,
  plain: renderPlainDiff,
  json: renderJsonDiff,
};

export default (data, option = 'full') => formatters[option](data);
