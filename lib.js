function isPositive(x) {
    var result;
    if (x > 0) {
      result = x + ' is positive';
    } else {
      result = x + ' is not positive';
    }
    return result;
  }

module.exports = {
    isPositive
}