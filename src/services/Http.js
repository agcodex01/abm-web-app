import _ from 'src/util/validation'

export function buildParams (map) {
  const params = {}
  const filter = Object.assign({}, map)

  for (const key in filter) {
    if (!_.isEmpty(filter[key] && filter[key] !== 'all')) {
      params[key] = filter[key]
    }
  }

  return params
}
