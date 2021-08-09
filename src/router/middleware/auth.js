import Types from 'src/store/types'
export default function auth ({ next, store }) {
  const user = store().getters[`${Types.AuthTypes.namespace}/${Types.AuthTypes.getters.GET_USER}`]
  console.log('user', user)
  if (!user) {
    return next({
      name: 'login'
    })
  }

  return next()
}
