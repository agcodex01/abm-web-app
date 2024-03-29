const UNIT = {
  namespace: 'units',
  getters: {
    GET_UNITS: 'GET_UNITS',
    GET_UNITS_FOR_FILTER: 'GET_UNITS_FOR_FILTER',
    GET_UNITS_TABLE_HEADER: 'GET_TRANSACTIONS_TABLE_HEADER',
    GET_UNIT: 'GET_UNIT',
    GET_LOADING: 'GET_LOADING',
    GET_CONFIG: 'GET_CONFIG',
    LOADING_CONFIG: 'LOADING_CONFIG'
  },
  actions: {
    GET_UNITS: 'GET_UNITS',
    GET_UNIT: 'GET_UNIT',
    CREATE_UNIT: 'CREATE_UNIT',
    UPDATE_UNIT: 'UPDATE_UNIT',
    DELETE_UNIT: 'DELETE_UNIT',
    GET_CONFIG: 'GET_CONFIG',
    CREATE_CONFIG: 'CREATE_CONFIG',
    DELETE_CONFIG: 'DELETE_CONFIG',
    DISABLE_UNIT: 'DISABLE_UNIT'
  },
  mutations: {
    SET_UNITS: 'SET_UNITS',
    SET_UNIT: 'SET_UNIT',
    SET_UNITS_FOR_FILTER: 'SET_UNITS_FOR_FILTER',
    CREATE_UNIT: 'CREATE_UNIT',
    UPDATE_UNIT: 'UPDATE_UNIT',
    DELETE_UNIT: 'DELETE_UNIT',
    SET_LOADING: 'SET_LOADING',
    SET_CONFIG: 'SET_CONFIG',
    SET_LOADING_CONFIG: 'SET_LOADING_CONFIG'
  }
}

export default UNIT
