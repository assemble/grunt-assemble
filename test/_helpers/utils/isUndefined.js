/**
 * isUndefined
 * @param  {[type]} value [description]
 * @return {[type]}       [description]
 */
var toString = Object.prototype.toString;

module.exports = function (value) {
  /*jshint eqnull: true */
  return value === 'undefined' || toString.call(value) === '[object Function]' || (value.hash != null);
};