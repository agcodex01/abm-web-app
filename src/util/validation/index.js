const _ = {
  isEmpty: (value) => {
    return emptyString(value) || nullValue(value) || emptyObject(value)
  }
}

export function emptyObject (value) {
  return value.constructor === Object && Object.entries(value).length === 0
}

export function emptyString (value) {
  return value === ''
}

export function nullValue (value) {
  return value === null
}

export function setErrorValues (errorObj, errors) {
  Object.keys(errorObj).forEach(key => {
    if (key in errors) {
      errorObj[key].error = true
      errorObj[key].message = errors[key][0]
    }
  })
}

export function resetErrorValues (errorObj) {
  Object.keys(errorObj).forEach(key => {
    errorObj[key].error = false
    errorObj[key].message = null
  })
}

export default _
