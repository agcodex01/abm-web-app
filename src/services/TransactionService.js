import { api } from './../boot/axios'

export function getTransactions () {
  return api.get('/transactions')
}
