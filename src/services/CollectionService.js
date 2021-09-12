import { api } from '../boot/axios'

const CollectionService = {
  getCollections () {
    return api.get('/collections')
  },
  getCollection: async (id) => {
    return await api.get(`/collections/${id}`)
  },
  createCollection: async (collectionData) => {
    return await api.post('/collections', collectionData)
  },
  updateCollection: async (id, collectionData) => {
    return await api.put(`/collections/${id}`, collectionData)
  },
  deleteCollection: async (id) => {
    return await api.delete(`/collections/${id}`)
  }
}

export default CollectionService
