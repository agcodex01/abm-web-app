import { api } from 'src/boot/axios'

const AccountService = {
  getAccountsByBillerId: async (billerId) => {
    return await api.get(`/billers/${billerId}/accounts`)
  }
}

export default AccountService
