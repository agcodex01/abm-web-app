import Types from 'src/store/types'
export default function auth ({ next, store }) {
  const token = store().getters[`${Types.AuthTypes.namespace}/${Types.AuthTypes.getters.GET_TOKEN}`]
  if (!token) {
    return next({
      name: 'login'
    })
  }

  return next()
}
