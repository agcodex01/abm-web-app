<template>
  <q-page padding>
    <div class="row q-col-gutter-md">
      <div class="col-xs-12 col-md-3" v-for="summary in dsSummary" :key="summary.id">
          <ds-summary  v-bind="summary"/>
      </div>
    </div>
    <q-table
      class="q-mt-lg half-width"
      title="Recent Transactions"
      :rows="transactions"
      :columns="tableHeader"
      row-key="id"
      :filter="filter"
    ><template v-slot:top-right>
        <q-input borderless dense debounce="300" v-model="filter" placeholder="Search" clearable>
          <template v-slot:append>
            <q-icon name="search" />
          </template>
        </q-input>
      </template>
    </q-table>
  </q-page>
</template>

<script>
import { mapGetters } from 'vuex'
import DsSummary from 'src/components/dashboard/DsSummary.vue'
import TRANSACTION from 'src/store/types/transactions'

export default {
  components: { DsSummary },
  name: 'Dashboard',
  data () {
    return {
      filter: ''
    }
  },
  async mounted () {
    this.$store.commit('layout/SET_HEADER', 'Dashboard')
    await this.$store.dispatch(`${TRANSACTION.namespace}/${TRANSACTION.actions.GET_TRANSACTIONS}`)
  },
  computed: {
    ...mapGetters({
      dsSummary: 'dashboard/getDsSummary',
      transactions: `${TRANSACTION.namespace}/${TRANSACTION.getters.GET_TRANSACTIONS}`,
      tableHeader: `${TRANSACTION.namespace}/${TRANSACTION.getters.GET_TRANSACTIONS_TABLE_HEADER}`
    })
  }
}
</script>
