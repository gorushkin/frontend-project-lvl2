import renderFullDiff from './renderFullDiff';
import renderPlainDiff from './renderPlainDiff';
import renderJsonDiff from './renderJsonDiff';

const formatters = {
  full: (array) => renderFullDiff(array),
  plain: (array) => renderPlainDiff(array),
  json: (array) => renderJsonDiff(array),
};

export default (array, option = 'full') => formatters[option](array);
