var invokedTimes = function (func, times = 1) {
  var result
  if (typeof nth !== 'number') {
    times = 1
  }
  if (typeof func !== 'function') {
    throw new TypeError('Expected a function')
  }
  return function (...args) {
    if (times-- > 0) {
      result = func(...args)
    }
    if (times <= 1) {
      func = undefined
    }
    return result
  }
}

export default invokedTimes