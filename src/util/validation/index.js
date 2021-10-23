const _ = {
  isEmpty: (value) => {
    return !!value || emptyString(value) || nullValue(value) || emptyObject(value)
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

export default _
