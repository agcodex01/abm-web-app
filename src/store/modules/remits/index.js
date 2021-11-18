import transactionPreviewHeader from 'src/store/modules/remits/transaction_preview'
import REMIT from 'src/store/types/remits'
import { STATUS_TYPE } from 'src/util/transaction'
import tableHeader from 'src/store/modules/remits/table_config'
import RemitService from 'src/services/RemitService'
import { exportFile, Notify } from 'quasar'
import FileUtil from 'src/util/file/file'

export default {
  namespaced: true,
  state: () => ({
    remits: [],
    transactionPreviewHeader,
    selectedTransactions: [],
    showRemitDialog: false,
    tableHeader,
    remitTransactions: [],
    remit: null,
    loading: false,
    downloadingReport: false
  }),
  getters: {
    [REMIT.getters.GET_REMITS]: (state) => state.remits,
    [REMIT.getters.GET_SELECTED_TRANSACTIONS]: (state) =>
      state.selectedTransactions,
    [REMIT.getters.GET_REMITS_TRANSACTION_PREVIEW_HEADER]: (state) =>
      state.transactionPreviewHeader,
    [REMIT.getters.GET_TABLE_HEADER]: (state) => state.tableHeader,
    [REMIT.getters.GET_REMIT_DIALOG_STATUS]: (state) => state.showRemitDialog,
    [REMIT.getters.GET_TOTAL]: (state) => {
      let total = 0
      if (!state.selectedTransactions) {
        return total
      }

      state.selectedTransactions.forEach((item) => {
        total += item.amount
      })

      return total
    },
    [REMIT.getters.GET_REMIT_TRANSACTIONS]: (state) => state.remitTransactions,
    [REMIT.getters.GET_REMIT]: (state) => state.remit,
    [REMIT.getters.GET_LOADING]: (state) => state.loading,
    [REMIT.getters.DOWNLOADING_REPORT]: state => state.downloadingReport
  },
  actions: {
    [REMIT.actions.GET_REMITS]: async ({ commit }, remitFilter) => {
      commit(REMIT.mutations.SET_LOADING, true)
      commit(REMIT.mutations.SET_REMITS, [])
      await RemitService.getRemits(remitFilter)
        .then(({ data }) => {
          commit(REMIT.mutations.SET_REMITS, data)
        })
        .catch((errors) => console.error(errors))
        .finally(() => commit(REMIT.mutations.SET_LOADING, false))
    },
    [REMIT.actions.CREATE_REMIT]: async (
      { commit },
      { remitter, selected, total }
    ) => {
      const transactionIds = selected.map((item) => {
        return item.id
      })
      const remit = {
        transaction_ids: transactionIds,
        total,
        remitted_by: remitter
      }
      commit(REMIT.mutations.SET_LOADING, true)
      return new Promise((resolve, reject) => {
        RemitService.createRemit(remit)
          .then(({ data }) => {
            commit(REMIT.mutations.ADD_REMIT, data)
            commit(REMIT.mutations.UPDATE_REMIT_DIALOG_STATUS, false)
            commit(REMIT.mutations.UPDATE_SELECTED_TRANSACTIONS, [])
            resolve(data)
          })
          .catch((errors) => reject(errors.response.data.errors))
          .finally(() => commit(REMIT.mutations.SET_LOADING, false))
      })
    },
    [REMIT.actions.GET_REMIT_TRANSACTIONS]: async ({ commit }, remitId) => {
      commit(REMIT.mutations.SET_LOADING, true)
      await RemitService.getRemitTransactions(remitId)
        .then(({ data }) => {
          commit(REMIT.mutations.SET_REMIT_TRANSACTIONS, data)
        })
        .catch((errors) => console.error(errors))
        .finally(() => commit(REMIT.mutations.SET_LOADING, false))
    },
    [REMIT.actions.UPDATE_SELECTED_TRANSACTIONS]: ({ commit }, selected) => {
      commit(REMIT.mutations.UPDATE_SELECTED_TRANSACTIONS, selected)
    },
    [REMIT.actions.OPEN_REMIT_DIALOG]: ({ commit }) => {
      commit(REMIT.mutations.UPDATE_REMIT_DIALOG_STATUS, true)
    },
    [REMIT.actions.CLOSE_REMIT_DIALOG]: ({ commit }) => {
      commit(REMIT.mutations.UPDATE_REMIT_DIALOG_STATUS, false)
    },
    [REMIT.actions.GET_REMIT]: async ({ commit }, remitId) => {
      commit(REMIT.mutations.SET_LOADING, true)
      await RemitService.getRemit(remitId)
        .then(({ data }) => {
          commit(REMIT.mutations.SET_REMIT, data)
        })
        .catch((errors) => console.error(errors))
        .finally(() => commit(REMIT.mutations.SET_LOADING, false))
    },
    [REMIT.actions.DOWNLOAD_REMIT_REPORT]: async ({ commit }, id) => {
      commit(REMIT.mutations.SET_DOWNLOADING_REPORT, true)
      await RemitService.downloadRemitReport(id).then(response => {
        exportFile(
          FileUtil.getFileNameFormContentDisposition(response.headers['content-disposition']),
          response.data
        )
      }).catch((errors) => {
        console.log(errors)
        Notify.create({
          position: 'top',
          type: 'negative',
          message: 'Something wrong downloading the report'
        })
      })
        .finally(() => commit(REMIT.mutations.SET_DOWNLOADING_REPORT, false))
    }
  },
  mutations: {
    [REMIT.mutations.SET_REMITS]: (state, remits) => {
      state.remits = remits
    },
    [REMIT.mutations.ADD_REMIT]: (state, remit) => {
      state.remits.unshift(remit)
    },
    [REMIT.mutations.UPDATE_SELECTED_TRANSACTIONS]: (state, transactions) => {
      state.selectedTransactions = transactions.filter(
        (item) => item.status === STATUS_TYPE.PENDING
      )
    },
    [REMIT.mutations.UPDATE_REMIT_DIALOG_STATUS]: (state, status) => {
      state.showRemitDialog = status
    },
    [REMIT.mutations.SET_REMIT_TRANSACTIONS]: (state, transactions) => {
      state.remitTransactions = transactions
    },
    [REMIT.mutations.SET_REMIT]: (state, remit) => {
      state.remit = remit
    },
    [REMIT.mutations.SET_LOADING]: (state, isLoading) => {
      state.loading = isLoading
    },
    [REMIT.mutations.SET_DOWNLOADING_REPORT]: (state, isDownloadingReport) => {
      state.downloadingReport = isDownloadingReport
    }
  }
}
