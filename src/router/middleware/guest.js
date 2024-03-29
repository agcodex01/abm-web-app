import Types from 'src/store/types'
export default function redirectIfAuthenticated ({ next, store }) {
  if (
    store().getters[
      `${Types.AuthTypes.namespace}/${Types.AuthTypes.getters.GET_TOKEN}`
    ]
  ) {
    return next({
      name: 'dashboard'
    })
  }

  return next()
}
