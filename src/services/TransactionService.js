import { api } from './../boot/axios'
import { buildParams } from './Http'

export function getTransactions (params) {
  return api.get('/transactions', {
    params: buildParams(params)
  })
}

export function getTransactionsByType (transactions, type) {
  if (!type) return transactions
  return transactions.filter(transaction => transaction.type === type)
}
