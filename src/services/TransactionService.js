import { api } from './../boot/axios'

export function getTransactions () {
  return api.get('/transactions')
}

export function getTransactionsByType (transactions, type) {
  if (!type) return transactions
  return transactions.filter(transaction => transaction.type === type)
}
