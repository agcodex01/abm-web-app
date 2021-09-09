import { api } from '../boot/axios'

const CollectionService = {
  getCollections () {
    return api.get('/collections')
  },
  getCollection: async (id) => {
    return await api.get(`/collections/${id}`)
  },
  updateCollection: async (id, collectionData) => {
    return await api.put(`/collections/${id}`, collectionData)
  }
}

export default CollectionService
