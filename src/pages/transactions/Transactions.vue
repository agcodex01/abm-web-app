<template>
  <q-page padding>
    <div class="q-pa-md q-gutter-sm">
      <q-breadcrumbs>
        <q-breadcrumbs-el icon="home" to="/" />
        <q-breadcrumbs-el
          label="transactions"
          icon="widgets"
          to="/start/pick-quasar-flavour"
        />
      </q-breadcrumbs>
    </div>

    <div class="row q-col-gutter-md">

      <p class="text-h5 h5 q-px-md q-pt-md q-mt-sm">Filter</p>

      <q-select
        class="col"
        style="max-width:300px"
        filled
        v-model="biller"
        :options="billers"
        option-label="name"
        label="Billers"
        @update:model-value="updateBiller"
        clearable
        dense
      />
      <q-select
        style="max-width:300px"
        class="col"
        filled
        v-model="type"
        :options="types"
        label="Types"
        @update:model-value="updateBillerType"
        dense
      />
    </div>

    <q-table
      class="q-mt-lg half-width"
      title="Transactions"
      :rows="transactions"
      :columns="tableHeader"
      row-key="id"
      :filter="filter"
    >
      <template v-slot:body-cell-actions="transaction">
        <q-td :value="transaction.id">
          <q-btn
            dense
            round
            flat
            color="grey"
            v-bind:to="'/transactions/update-transaction/' + transaction.key"
            icon="edit"
          ></q-btn>
          <q-btn
            dense
            round
            flat
            color="grey"
            @click="deleteRow(transaction)"
            icon="delete"
          ></q-btn>
        </q-td>
      </template>
      <template v-slot:top-right>
        <q-input
          outlined
          dense
          debounce="300"
          v-model="filter"
          placeholder="Search"
          clearable
        >
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

export default {
  name: 'Transactions',
  data () {
    return {
      filter: '',
      unitModel: '',
      typeModel: '',
      billerModel: '',
      biller: null,
      type: null
    }
  },
  mounted () {
    this.$store.commit('layout/SET_HEADER', 'Transactions')
    this.$store.dispatch('transactions/getTransactions')
    this.$store.dispatch('billers/GET_BILLERS')
    this.type = this.selectedType
  },
  computed: {
    ...mapGetters({
      transactions: 'transactions/getTransactions',
      tableHeader: 'transactions/getTableHeader',
      billers: 'billers/GET_BILLERS',
      types: 'billers/GET_BILLER_TYPES',
      selectedType: 'billers/GET_SELECTED_BILLER_TYPE'
    })
  },
  methods: {
    deleteRow (transaction) {
      this.$q
        .dialog({
          title: 'Confirm',
          message:
            'Are you sure you want to delete ' +
            transaction.key +
            ' transaction?',
          cancel: true,
          persistent: true
        })
        .onOk(() => {
          this.$store.commit('transactions/remove', transaction)
          this.$q.notify('Transaction deleted!')
        })
    },
    updateBiller (biller) {
      if (biller) {
        this.type = biller.type
        this.$store.commit('billers/SET_SELECTED_BILLER_TYPE', biller.type)
      }

      this.$store.commit('billers/SET_BILLER', biller)
    },
    updateBillerType (type) {
      this.$store.commit('billers/SET_SELECTED_BILLER_TYPE', type)
    }
  }
}
</script>
