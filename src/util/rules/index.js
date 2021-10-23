import _ from 'src/util/validation'
import * as Message from './messages'

export function required (field) {
  return Message.REQUIRED.replace(Message.ATTR, field)
}

export function exists (field) {
  return Message.EXISTS.replace(Message.ATTR, field)
}

export function min (value, field) {
  return Message.MIN.replace(Message.ATTR, field).replace(Message.VALUE, value)
}

export function incorrect (field) {
  return Message.INCORRECT.replace(Message.ATTR, field)
}

const Validation = {
  required: (value, field) => {
    if (isNaN(value)) {
      return !_.isEmpty(value) || required(field)
    }
    return (!!value && value > 0) || required(field)
  },
  min: (value, field, limit) => {
    return (!!value && value.length >= limit) || min(limit, field)
  }
}

export default Validation
