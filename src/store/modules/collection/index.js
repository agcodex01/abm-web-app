import COLLECTION from 'src/store/types/collections'
import CollectionService from 'src/services/CollectionService'
import tableHeader from './collection_table_config'

export default {
  namespaced: true,
  state: () => ({
    collections: [],
    collection: null,
    collectionsForFilter: [],
    tableHeader: tableHeader
  }),
  getters: {
    [COLLECTION.getters.GET_COLLECTIONS]: state => state.collections,
    [COLLECTION.getters.GET_COLLECTIONS_FOR_FILTER]: state => state.collectionsForFilter,
    [COLLECTION.getters.GET_COLLECTIONS_TABLE_HEADER]: state => state.tableHeader,
    [COLLECTION.getters.GET_COLLECTION]: (state) => state.collection
  },
  actions: {
    [COLLECTION.actions.GET_COLLECTIONS]: ({ commit }) => {
      CollectionService.getCollections().then(({ data }) => {
        const collectionsForFilter = data.map(collection => Object.assign({}, {
          value: collection.id,
          label: collection.name
        }))
        commit(COLLECTION.mutations.SET_COLLECTIONS, data)
        commit(COLLECTION.mutations.SET_COLLECTIONS_FOR_FILTER, collectionsForFilter)
      }).catch(errors => console.error(errors))
    },
    [COLLECTION.actions.GET_COLLECTION]: async ({ commit }, id) => {
      await CollectionService.getCollection(id)
        .then(({ data }) => {
          commit(COLLECTION.mutations.SET_COLLECTION, data)
        })
        .catch((errors) => console.error(errors))
    },
    [COLLECTION.actions.CREATE_COLLECTION] ({ commit }, newCollection) {
      return new Promise((resolve, reject) => {
        CollectionService.createCollection(newCollection).then(response => {
          commit(COLLECTION.mutations.CREATE_COLLECTION, response.data)
          resolve(response)
        }).catch((errors) => {
          reject(errors)
          console.log(errors)
        })
      })
    },
    [COLLECTION.actions.DELETE_COLLECTION] ({ commit }, id) {
      return new Promise((resolve, reject) => {
        CollectionService.deleteCollection(id).then(response => {
          commit(COLLECTION.mutations.DELETE_COLLECTION, id)
          resolve(response)
        }).catch((errors) => {
          reject(errors)
          console.log(errors)
        })
      })
    },
    [COLLECTION.actions.UPDATE_COLLECTION]: async ({ commit }, { id, collection }) => {
      return await new Promise((resolve, reject) => {
        CollectionService.updateCollection(id, collection)
          .then(({ data }) => {
            commit(COLLECTION.mutations.SET_COLLECTION, data)
            resolve(data)
          })
          .catch((errors) => reject(errors.response.data.errors))
      })
    }
  },
  mutations: {
    [COLLECTION.mutations.SET_COLLECTIONS]: (state, collections) => {
      state.collections = collections
    },
    [COLLECTION.mutations.SET_COLLECTIONS_FOR_FILTER]: (state, collections) => {
      state.collectionsForFilter = collections
    },
    [COLLECTION.mutations.CREATE_COLLECTION]: (state, collection) => {
      state.collections.push(collection)
    },
    [COLLECTION.mutations.DELETE_COLLECTION]: (state, collection) => {
      const collections = state.collections.filter(t => t.id !== collection)
      state.collections = collections
    },
    [COLLECTION.mutations.SET_COLLECTION]: (state, collection) => {
      state.collection = collection
    }
  }
}
