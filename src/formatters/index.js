import renderFullDiff from './renderFullDiff';
import renderPlainDiff from './renderPlainDiff';

const formatters = {
  full: (array) => renderFullDiff(array),
  plain: (array) => renderPlainDiff(array)
}

export default (array, option) => formatters[option](array);
