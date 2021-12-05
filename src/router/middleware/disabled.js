import { LocalStorage } from 'quasar'
import AuthTypes from 'src/store/types/auth'

export default function disabled ({ next, store }) {
  const user = store().getters[`${AuthTypes.namespace}/${AuthTypes.getters.GET_USER}`]

  if (user.disabled) {
    LocalStorage.remove('user')
    LocalStorage.remove('token')
    return next({
      name: 'account_disabled'
    })
  }

  return next()
}
