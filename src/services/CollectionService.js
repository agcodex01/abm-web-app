import AppConstant from 'src/constant/app'
import { api } from '../boot/axios'

const CollectionService = {
  getCollections () {
    return api.get('/collections')
  },
  getCollection: async (id) => {
    return await api.get(`/collections/${id}`)
  },
  createCollection: async (data) => {
    const fd = new FormData()

    for (const key in data) {
      if (key !== 'images') {
        fd.append(key, data[key])
      }
    }

    if (data.images.length) {
      data.images.forEach(image => {
        fd.append('images[]', image)
      })
    }

    return await api.post('/collections', fd, {
      headers: AppConstant.MULTIPART_HEADER
    })
  },
  updateCollection: async (id, data) => {
    const dataWithoutImage = {}

    for (const key in data) {
      if (key !== 'images') {
        dataWithoutImage[key] = data[key]
      }
    }
    return await api.put(`/collections/${id}`, dataWithoutImage)
  },
  deleteCollection: async (id) => {
    return await api.delete(`/collections/${id}`)
  }
}

export default CollectionService
