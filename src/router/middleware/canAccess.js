import UserService from 'src/services/UserService'
import AuthTypes from 'src/store/types/auth'

export default async function canAccess ({ to, next, store }) {
  const user =
    store().getters[`${AuthTypes.namespace}/${AuthTypes.getters.GET_USER}`]
  const token =
    store().getters[`${AuthTypes.namespace}/${AuthTypes.getters.GET_TOKEN}`]
  let hasAccess = false

  if (!token || !user) {
    return next({
      name: 'login'
    })
  }

  await UserService.checkAccess(user.id, to.meta.roles).then(({ data }) => {
    hasAccess = data
  })

  if (!hasAccess) {
    console.log('HAS ACCESS NO')
    return next({
      name: 'access_denied'
    })
  }

  return next()
}
