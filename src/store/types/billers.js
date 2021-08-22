const BILLER = {
  namespace: 'billers',
  getters: {
    GET_BILLERS: 'GET_BILLERS',
    GET_BILLER_TYPES: 'GET_BILLER_TYPES',
    GET_BILLERS_FOR_FILTER: 'GET_BILLERS_FOR_FILTER'
  },
  actions: {
    GET_BILLERS: 'GET_BILLERS',
    GET_BILLER_TYPES: 'GET_BILLER_TYPES'
  },
  mutations: {
    SET_BILLERS: 'SET_BILLERS',
    SET_BILLER_TYPES: 'SET_BILLER_TYPES',
    SET_BILLERS_FOR_FILTER: 'SET_BILLERS_FOR_FILTER'
  }
}

export const BILLER_TYPE = {
  ALL: {
    label: 'All',
    value: ''
  },
  ELECTRICITY: {
    label: 'Electricity',
    value: 'electricity'
  },
  INTERNET: {
    label: 'Internet',
    value: 'internet'
  },
  WATER: {
    label: 'Water',
    value: 'water'
  }
}

export function getBillerTypes () {
  return [
    BILLER_TYPE.ALL,
    BILLER_TYPE.ELECTRICITY,
    BILLER_TYPE.INTERNET,
    BILLER_TYPE.WATER
  ]
}

export default BILLER
