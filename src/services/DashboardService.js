import { api } from 'src/boot/axios'

const DashboardService = {
  getDsSummary: async () => {
    return await api.get('dashboard/summary')
  },
  getTransactionPreview: async () => {
    return await api.get('dashboard/transactions/preview')
  }
}

export default DashboardService
