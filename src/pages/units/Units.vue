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
        <q-breadcrumbs-el label="Units"/>
      </q-breadcrumbs>
      <q-btn
        size="sm"
        outline
        color="primary"
        label="Add Unit"
        icon-right="add"
        @click="$router.push({ name: 'create_unit' })"
      />
    </div>

    <q-table
      title="Units"
      no-data-label="There is no Units as of now!"
      no-results-label="The filter didn't find any Units"
      loading-label="Fetching units..."
      class="q-mt-lg"
      row-key="id"
      :rows="unitsData"
      :columns="tableHeader"
      :filter="filter"
      :loading="loading"
    >

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

      <template v-slot:body-cell-id="props">
        <q-td :props="props">
          <q-btn
            size="sm"
            no-caps
            style="font-size: 12px"
            text-color="primary"
            class="link"
            type="a"
            flat
            :label="props.value"
            :to="{ name: 'update_unit', params: { id: props.value } }"
          />
        </q-td>
      </template>

      <template v-slot:body-cell-actions="unit">
            <q-td :value="unit.id">
              <q-btn :disable="disable(unit.row)" dense round flat color="negative" @click="deleteRow(unit)" icon="delete_outline"></q-btn>
            </q-td>
      </template>

      <template v-slot:loading>
       <table-loader v-if="loading"/>
      </template>
      <template v-slot:no-data="{ message }">
        <no-data :message="message"/>
      </template>
    </q-table>
  </q-page>
</template>

<script>
import { mapGetters } from 'vuex'
import UNIT from 'src/store/types/units'
import AuthTypes from 'src/store/types/auth'
import TableLoader from 'src/components/loaders/TableLoader.vue'
import NoData from 'src/components/loaders/NoData.vue'

export default {
  name: 'Transactions',
  components: { TableLoader, NoData },
  data: () => ({
    filter: ''
  }),
  async mounted () {
    this.$store.commit('layout/SET_HEADER', 'Units')
    await this.$store.dispatch(`${UNIT.namespace}/${UNIT.actions.GET_UNITS}`)
  },
  computed: {
    ...mapGetters({
      user: `${AuthTypes.namespace}/${AuthTypes.getters.GET_USER}`,
      units: `${UNIT.namespace}/${UNIT.getters.GET_UNITS}`,
      tableHeader: `${UNIT.namespace}/${UNIT.getters.GET_UNITS_TABLE_HEADER}`,
      loading: `${UNIT.namespace}/${UNIT.getters.GET_LOADING}`
    }),
    unitsData () {
      return this.loading ? [] : this.units
    }
  },
  methods: {
    deleteRow (unit) {
      this.$q.dialog({
        title: 'Confirm',
        message: 'Are you sure you want to delete ' + unit.row.name + '?',
        cancel: true,
        persistent: true
      }).onOk(() => {
        this.$store.dispatch(`${UNIT.namespace}/${UNIT.actions.DELETE_UNIT}`, unit.row.id).then(response => {
          this.$q.notify({
            type: 'positive',
            message: `Successfully deleted ${unit.row.name}.`,
            position: 'top'
          })
        }, errors => {
          console.log(errors)
        })
      })
    },
    disable (unit) {
      return unit.collections_count > 0 || unit.transactions_count > 0
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
