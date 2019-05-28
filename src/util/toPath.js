var toPath = function (obj, ...args) {
  if (args.length === 0) {
    return obj
  }
  if (args.length === 1 && Array.isArray(args[0])) {
    args = args[0]
  }
  var result = args.reduce(function (re, it) {
    return re[it]
  }, obj)
  return result
}

export default toPath