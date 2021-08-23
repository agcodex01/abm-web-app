<template>
  <q-page padding>
    <div class="flex justify-between align-center q-mt-md q-mb-xl">
      <q-breadcrumbs class="align-center q-pa-sm" style="font-size: 14px">
        <template v-slot:separator>
          <q-icon
            size="24px"
            name="chevron_right"
          />
        </template>
        <q-breadcrumbs-el to="/" label="Adopisoft Billing Machine" />
        <q-breadcrumbs-el label="Transactions"/>
      </q-breadcrumbs>
      <q-btn outline style="font-size:12px" :disable="!selected.length" color="primary"  label="Add new remit"/>
    </div>

    <div class="row q-col-gutter-sm">
      <q-select
        class="col"
        filled
        v-model="transactionFilter.unitName"
        :options="units"
        label="Units"
        @update:model-value="updateFilter"
        clearable
        options-dense
        emit-value
        dense
      />
      <q-select
        class="col"
        filled
        v-model="transactionFilter.billerName"
        :options="billers"
        label="Billers"
        @update:model-value="updateFilter"
        clearable
        options-dense
        emit-value
        dense
      />
      <q-select
        class="col"
        filled
        v-model="transactionFilter.billerType"
        :options="types"
        label="Types"
        @update:model-value="updateFilter"
        options-dense
        map-options
        emit-value
        dense
      />
      <q-select
        class="col"
        filled
        v-model="transactionFilter.status"
        :options="statuses"
        label="Status"
        options-dense
        @update:model-value="updateFilter"
        map-options
        emit-value
        dense
      />
      <q-select
        class="col"
        filled
        v-model="transactionFilter.createdAt"
        :options="createdAtOptions"
        label="Created At"
        @update:model-value="updateFilter"
        options-dense
        emit-value
        map-options
        dense
      />
    </div>

    <q-table
      title="Transactions"
      no-data-label="There is no transactions as of now!"
      no-results-label="The filter didn't uncover any transactions"
      class="q-mt-lg"
      selection="multiple"
      row-key="id"
      v-model:selected="selected"
      :rows="transactions"
      :columns="tableHeader"
      :filter="filter"
      :loading="loading"
    >
      <template v-slot:loading>
        <q-inner-loading :showing="loading" color="primary">
          <q-spinner
            color="primary"
            size="2rem"
            :thickness="5"
          />
          <div class="text-subtitle2 q-mt-md">Fetching data...</div>
        </q-inner-loading>
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
      <template v-slot:body-selection="scope">
        <q-checkbox :disable="remittable(scope.row.status)"  v-model="scope.selected" />
      </template>
      <template v-slot:body-cell-id="props">
        <q-td :props="props">
          <q-btn
            size="sm"
            no-caps
            style="font-size:12px"
            text-color="primary"
            class="link"
            type="a"
            flat
            :label="props.value"
          />
        </q-td>
      </template>
      <template v-slot:body-cell-type="props">
        <q-td :props="props">
          <q-badge
            :color="typeColor(props.value)"
            :label="props.value"
          />
        </q-td>
      </template>
       <template v-slot:body-cell-status="props">
        <q-td :props="props">
          <q-badge
            :color="statusColor(props.value)"
            :label="props.value"
          />
        </q-td>
      </template>
      <template v-slot:no-data="{ message }">
        <div class="full-width text-subtitle1 text-center text-primary">
          {{ message }}
        </div>
      </template>
    </q-table>
  </q-page>
</template>

<script>
import { mapGetters } from 'vuex'
import BILLER, { BILLER_TYPE } from 'src/store/types/billers'
import TRANSACTION from 'src/store/types/transactions'
import Unit from 'src/store/types/units'
import GeneralTypes from 'src/store/types/general'
import { CREATED_AT, getCreateAtOptions, getStatusTypes, STATUS_TYPE } from 'util/transaction'

export default {
  name: 'Transactions',
  data () {
    return {
      filter: '',
      selected: [],
      statuses: getStatusTypes(),
      createdAtOptions: getCreateAtOptions(),
      transactionFilter: {
        unitName: '',
        billerName: '',
        billerType: BILLER_TYPE.ALL.value,
        status: STATUS_TYPE.PENDING,
        createdAt: CREATED_AT.TODAY.value
      }
    }
  },
  async mounted () {
    this.$store.commit('layout/SET_HEADER', 'Transactions')
    await this.$store.dispatch(`${TRANSACTION.namespace}/${TRANSACTION.actions.GET_TRANSACTIONS}`, this.transactionFilter)
    await this.$store.dispatch(`${Unit.namespace}/${Unit.actions.GET_UNITS}`)
    await this.$store.dispatch(`${BILLER.namespace}/${BILLER.actions.GET_BILLERS}`)
  },
  computed: {
    ...mapGetters({
      transactions: `${TRANSACTION.namespace}/${TRANSACTION.getters.GET_TRANSACTIONS}`,
      tableHeader: `${TRANSACTION.namespace}/${TRANSACTION.getters.GET_TRANSACTIONS_TABLE_HEADER}`,
      statusColor: `${TRANSACTION.namespace}/${TRANSACTION.getters.GET_STATUS_COLOR}`,
      typeColor: `${TRANSACTION.namespace}/${TRANSACTION.getters.GET_TYPE_COLOR}`,
      remittable: `${TRANSACTION.namespace}/${TRANSACTION.getters.REMITTABLE}`,
      billers: `${BILLER.namespace}/${BILLER.getters.GET_BILLERS_FOR_FILTER}`,
      types: `${BILLER.namespace}/${BILLER.getters.GET_BILLER_TYPES}`,
      units: `${Unit.namespace}/${Unit.getters.GET_UNITS_FOR_FILTER}`,
      loading: `${GeneralTypes.namespace}/${GeneralTypes.getters.GET_LOADING}`
    })
  },
  methods: {
    async updateFilter () {
      await this.$store.dispatch(`${TRANSACTION.namespace}/${TRANSACTION.actions.GET_TRANSACTIONS}`, this.transactionFilter)
    }
  }
}
</script>
