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

export default {
  components: { DsSummary },
  name: 'Dashboard',
  data () {
    return {
      filter: ''
    }
  },
  mounted () {
    this.$store.commit('layout/SET_HEADER', 'Dashboard')
    this.$store.commit(
      'dashboard/INCREMENT_VALUE',
      { id: 1, value: 10 }
    )
    this.$store.commit('transactions/SET_TRANSACTIONS', [
      {
        id: '918857d6-fcbf-4c93-8412-e18d3dba0435',
        unit: 'Unit 1',
        type: 'ELECTRICITY',
        amount: 1000,
        address: 'Nasipit Rd. Talamaban Cebu'
      },
      {
        id: '918857d6-fcbf-4c93-8412-e18d3dba0435',
        unit: 'Unit 1',
        type: 'ELECTRICITY',
        amount: 1000,
        address: 'Nasipit Rd. Talamaban Cebu'
      },
      {
        id: '918857d6-fcbf-4c93-8412-e18d3dba0435',
        unit: 'Unit 3',
        type: 'ELECTRICITY',
        amount: 1000,
        address: 'Nasipit Rd. Talamaban Cebu'
      },
      {
        id: '918857d6-fcbf-4c93-8412-e18d3dba0435',
        unit: 'Unit 1',
        type: 'ELECTRICITY',
        amount: 1000,
        address: 'Nasipit Rd. Talamaban Cebu'
      },
      {
        id: '918857d6-fcbf-4c93-8412-e18d3dba0435',
        unit: 'Unit 1',
        type: 'ELECTRICITY',
        amount: 1000,
        address: 'Nasipit Rd. Talamaban Cebu'
      }
    ])
  },
  computed: {
    ...mapGetters({
      dsSummary: 'dashboard/getDsSummary',
      transactions: 'transactions/getTransactions',
      tableHeader: 'transactions/getTableHeader'
    })
  }
}
</script>
