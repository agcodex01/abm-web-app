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
      <q-btn size="sm" outline :disable="!selected.length" color="primary"  label="Preview remit" @click="openRemitDialog"/>
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
      no-results-label="The filter didn't find any transactions"
      class="q-mt-lg"
      selection="multiple"
      row-key="id"
      v-model:selected="selected"
      :rows="transactions"
      :columns="tableHeader"
      :filter="filter"
      :loading="loading"
      @update:selected="selectedRow"
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
    <q-dialog v-model="showRemitDialog" persistent>
      <q-card class="q-pa-sm" style="width: 90%; max-width: 90vw;">
        <q-card-section>
          <div class="text-h6">Remit Preview</div>
        </q-card-section>
        <q-card-section class="row justify-between">
          <div class="text-subtitle2">Remmiter : <span>  {{ user.name }} </span> </div>
          <div class="text-subtitle2">Total: P <span>  {{ total }}</span> </div>
        </q-card-section>
        <q-card-section>
          <q-table
            style="max-height: 310px"
            class="sticky-header-table"
            :rows="selected"
            :columns="transactionPreviewHeader"
            row-key="id"
            flat
          >
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
          </q-table>
        </q-card-section>
        <q-card-actions align="right">
          <q-btn size="sm" unelevated outline padding="sm md" label="Cancel" color="primary" @click="closeRemitDialog" />
          <q-btn size="sm" unelevated :loading="loading" padding="sm md" label="Create new remit" color="primary" @click="createNewRemit">
            <template v-slot:loading>
              <q-spinner class="on-left" />
              Loading...
            </template>
          </q-btn>
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import BILLER, { BILLER_TYPE } from 'src/store/types/billers'
import TRANSACTION from 'src/store/types/transactions'
import Unit from 'src/store/types/units'
import GeneralTypes from 'src/store/types/general'
import { CREATED_AT, getCreateAtOptions, getStatusTypes, STATUS_TYPE } from 'util/transaction'
import REMIT from 'src/store/types/remits'
import AuthTypes from 'src/store/types/auth'

export default {
  name: 'Transactions',
  data () {
    return {
      filter: '',
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
      user: `${AuthTypes.namespace}/${AuthTypes.getters.GET_USER}`,
      transactions: `${TRANSACTION.namespace}/${TRANSACTION.getters.GET_TRANSACTIONS}`,
      tableHeader: `${TRANSACTION.namespace}/${TRANSACTION.getters.GET_TRANSACTIONS_TABLE_HEADER}`,
      statusColor: `${TRANSACTION.namespace}/${TRANSACTION.getters.GET_STATUS_COLOR}`,
      typeColor: `${TRANSACTION.namespace}/${TRANSACTION.getters.GET_TYPE_COLOR}`,
      remittable: `${TRANSACTION.namespace}/${TRANSACTION.getters.REMITTABLE}`,
      billers: `${BILLER.namespace}/${BILLER.getters.GET_BILLERS_FOR_FILTER}`,
      types: `${BILLER.namespace}/${BILLER.getters.GET_BILLER_TYPES}`,
      selected: `${REMIT.namespace}/${REMIT.getters.GET_SELECTED_TRANSACTIONS}`,
      transactionPreviewHeader: `${REMIT.namespace}/${REMIT.getters.GET_REMITS_TRANSACTION_PREVIEW_HEADER}`,
      showRemitDialog: `${REMIT.namespace}/${REMIT.getters.GET_REMIT_DIALOG_STATUS}`,
      total: `${REMIT.namespace}/${REMIT.getters.GET_TOTAL}`,
      units: `${Unit.namespace}/${Unit.getters.GET_UNITS_FOR_FILTER}`,
      loading: `${GeneralTypes.namespace}/${GeneralTypes.getters.GET_LOADING}`
    })
  },
  methods: {
    ...mapActions({
      createNewRemit: `${REMIT.namespace}/${REMIT.actions.CREATE_REMIT}`,
      openRemitDialog: `${REMIT.namespace}/${REMIT.actions.OPEN_REMIT_DIALOG}`,
      closeRemitDialog: `${REMIT.namespace}/${REMIT.actions.CLOSE_REMIT_DIALOG}`,
      selectedRow: `${REMIT.namespace}/${REMIT.actions.UPDATE_SELECTED_TRANSACTIONS}`
    }),
    async updateFilter () {
      await this.$store.dispatch(`${TRANSACTION.namespace}/${TRANSACTION.actions.GET_TRANSACTIONS}`, this.transactionFilter)
    },
    async createNewRemit () {
      await this.$store.dispatch(`${REMIT.namespace}/${REMIT.actions.CREATE_REMIT}`, {
        selected: this.selected,
        remitter: this.user.name,
        total: this.total
      })
        .then(() => {
          this.updateFilter()
          this.$q.notify({
            type: 'positive',
            message: 'Successfully created a new remit.',
            position: 'top'
          })
        })
        .catch(errors => console.error(errors))
    }
  }
}
</script>
<style lang="sass">
.sticky-header-table
  .q-table__top,
  .q-table__bottom,
  thead tr:first-child th
    /* bg color is important for th; just specify one */
    background-color: #ffffff

  thead tr th
    position: sticky
    z-index: 1
  thead tr:first-child th
    top: 0

  /* this is when the loading indicator appears */
  &.q-table--loading thead tr:last-child th
    /* height of all previous header rows */
    top: 48px
</style>
