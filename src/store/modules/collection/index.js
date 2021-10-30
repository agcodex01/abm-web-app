import COLLECTION from 'src/store/types/collections'
import CollectionService from 'src/services/CollectionService'
import tableHeader from './collection_table_config'

export default {
  namespaced: true,
  state: () => ({
    collections: [],
    collection: null,
    tableHeader: tableHeader,
    loading: false
  }),
  getters: {
    [COLLECTION.getters.GET_COLLECTIONS]: (state) => state.collections,
    [COLLECTION.getters.GET_COLLECTIONS_TABLE_HEADER]: (state) => state.tableHeader,
    [COLLECTION.getters.GET_COLLECTION]: (state) => state.collection,
    [COLLECTION.getters.GET_LOADING]: (state) => state.loading
  },
  actions: {
    [COLLECTION.actions.GET_COLLECTIONS]: ({ commit }) => {
      commit(COLLECTION.mutations.SET_LOADING, true)
      commit(COLLECTION.mutations.SET_COLLECTIONS, [])
      CollectionService.getCollections()
        .then(({ data }) => {
          commit(COLLECTION.mutations.SET_COLLECTIONS, data)
        })
        .catch((errors) => console.error(errors))
        .finally(() => commit(COLLECTION.mutations.SET_LOADING, false))
    },
    [COLLECTION.actions.GET_COLLECTION]: async ({ commit }, id) => {
      commit(COLLECTION.mutations.SET_LOADING, true)
      await CollectionService.getCollection(id)
        .then(({ data }) => {
          commit(COLLECTION.mutations.SET_COLLECTION, data)
        })
        .catch((errors) => console.error(errors))
        .finally(() => commit(COLLECTION.mutations.SET_LOADING, false))
    },
    [COLLECTION.actions.CREATE_COLLECTION]: ({ commit }, newCollection) => {
      commit(COLLECTION.mutations.SET_LOADING, true)
      return new Promise((resolve, reject) => {
        CollectionService.createCollection(newCollection)
          .then(({ data }) => {
            resolve(data)
          })
          .catch((errors) => {
            reject(errors.response.data.errors)
          })
          .finally(() => commit(COLLECTION.mutations.SET_LOADING, false))
      })
    },
    [COLLECTION.actions.DELETE_COLLECTION]: ({ commit }, id) => {
      commit(COLLECTION.mutations.SET_LOADING, true)
      return new Promise((resolve, reject) => {
        CollectionService.deleteCollection(id)
          .then((response) => {
            commit(COLLECTION.mutations.DELETE_COLLECTION, id)
            resolve(response)
          })
          .catch((errors) => {
            reject(errors)
          })
          .finally(() => commit(COLLECTION.mutations.SET_LOADING, false))
      })
    },
    [COLLECTION.actions.UPDATE_COLLECTION]: async ({ commit }, { id, collection }) => {
      commit(COLLECTION.mutations.SET_LOADING, true)
      return await new Promise((resolve, reject) => {
        CollectionService.updateCollection(id, collection)
          .then(({ data }) => {
            commit(COLLECTION.mutations.SET_COLLECTION, data)
            resolve(data)
          })
          .catch((errors) => reject(errors.response.data.errors))
          .finally(() => commit(COLLECTION.mutations.SET_LOADING, false))
      })
    }
  },
  mutations: {
    [COLLECTION.mutations.SET_COLLECTIONS]: (state, collections) => {
      state.collections = collections
    },
    [COLLECTION.mutations.CREATE_COLLECTION]: (state, collection) => {
      state.collections.push(collection)
    },
    [COLLECTION.mutations.DELETE_COLLECTION]: (state, collection) => {
      const collections = state.collections.filter((t) => t.id !== collection)
      state.collections = collections
    },
    [COLLECTION.mutations.SET_COLLECTION]: (state, collection) => {
      state.collection = collection
    },
    [COLLECTION.mutations.SET_COLLECTION_IMAGES]: (state, images) => {
      state.collection.images = images
    },
    [COLLECTION.mutations.SET_LOADING]: (state, value) => {
      state.loading = value
    }
  }
}
