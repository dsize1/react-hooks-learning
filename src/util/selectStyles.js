var selectStyles = function (sourses, collections) {
  if (typeof sourses !== 'object'
    || !Array.isArray(collections) ) {
    return null
  }
  const styles = Object.entries(sourses).reduce(function (selected, [key, value]) {
    if (collections.includes(key)) {
      selected[key] = value
    }
    return selected
  }, {})
  return Object.values(styles)
}

export default selectStyles