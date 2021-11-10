import { api } from 'src/boot/axios'

const FeedbackService = {
  getFeedbacks: async () => {
    return await api.get('/feedback')
  }
}

export default FeedbackService
