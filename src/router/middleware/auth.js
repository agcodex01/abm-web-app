import AuthTypes from 'src/store/types/auth'

export default function auth ({ next, store }) {
  const user = store().getters[`${AuthTypes.namespace}/${AuthTypes.getters.GET_USER}`]
  const token = store().getters[`${AuthTypes.namespace}/${AuthTypes.getters.GET_TOKEN}`]
  if (!token || !user) {
    return next({
      name: 'login'
    })
  }

  return next()
}
