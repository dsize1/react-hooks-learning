var isHexColor = function (hexColor) {
  var codeAt = function (char) {
    return String.prototype.charCodeAt.call(char)
  }
  var ch_0 = codeAt('0')
  var ch_9 = codeAt('9')
  var ch_a = codeAt('a')
  var ch_f = codeAt('f')
  var ch_A = codeAt('A')
  var ch_F = codeAt('F')

  var length = hexColor.length
  if ([4, 5, 7, 9].some((l) => l === length) && hexColor[0] === '#') {
    if (hexColor.split('').slice(1).every((ch) => {
      var charCode = codeAt(ch)
      return (charCode >= ch_0 && charCode <= ch_9) 
        || (charCode >= ch_a && charCode <= ch_f) 
        || (charCode >= ch_A && charCode <= ch_F)
    })) {
      return true
    }
  }
  return false
}

export default isHexColor