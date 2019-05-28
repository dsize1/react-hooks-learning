import toPath from './toPath'

var classOf = function (...args) {
  try {
    var value = toPath(...args)
    return Object.prototype.toString.call(value).slice(8, -1).toLocaleLowerCase()
  } catch(e) {
    console.log(e)
    return ''
  }
}

export default classOf