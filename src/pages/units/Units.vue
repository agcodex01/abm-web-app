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
        label="Add new"
        icon-right="add"
        @click="$router.push({ name: 'create_unit' })"
      />
    </div>

    <q-table
      title="Units"
      no-data-label="There is no Units as of now!"
      no-results-label="The filter didn't find any Units"
      class="q-mt-lg"
      row-key="id"
      :rows="units"
      :columns="tableHeader"
      :filter="filter"
      :loading="loading"
    >
    <template v-slot:body-cell-address="unit">
            <q-td :value="unit.id">
              {{unit.row.barangay}}, {{unit.row.municipality}}, {{unit.row.city}}, {{unit.row.province}}
            </q-td>
    </template>
    <template v-slot:body-cell-actions="unit">
            <q-td :value="unit.id">
              <q-btn dense round flat color="grey" icon="edit" :to="{ name: 'update_unit', params: { id: unit.row.id } }"></q-btn>
              <q-btn dense round flat color="grey" @click="deleteRow(unit)" icon="delete"></q-btn>
            </q-td>
    </template>

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
    </q-table>
  </q-page>
</template>

<script>
import { mapGetters } from 'vuex'
import UNIT from 'src/store/types/units'
import GeneralTypes from 'src/store/types/general'
import AuthTypes from 'src/store/types/auth'

export default {
  name: 'Transactions',
  data () {
    return {
      filter: ''
    }
  },
  async mounted () {
    this.$store.commit('layout/SET_HEADER', 'Units')
    await this.$store.dispatch(`${UNIT.namespace}/${UNIT.actions.GET_UNITS}`)
  },
  computed: {
    ...mapGetters({
      user: `${AuthTypes.namespace}/${AuthTypes.getters.GET_USER}`,
      units: `${UNIT.namespace}/${UNIT.getters.GET_UNITS}`,
      tableHeader: `${UNIT.namespace}/${UNIT.getters.GET_UNITS_TABLE_HEADER}`,
      loading: `${GeneralTypes.namespace}/${GeneralTypes.getters.GET_LOADING}`
    })
  },
  methods: {
    // editUnit (unit) {
    //   this.$store.dispatch(`${UNIT.namespace}/${UNIT.actions.UPDATE_UNIT}`, unit.row).then(response => {
    //     this.$q.notify({
    //       type: 'positive',
    //       message: `Successfully updated ${unit.row.name}.`,
    //       position: 'top'
    //     })
    //   }, errors => {
    //     console.log(errors)
    //   })
    // },
    deleteRow (unit) {
      this.$q.dialog({
        title: 'Confirm',
        message: 'Are you sure you want to delete ' + unit.row.name + '?',
        cancel: true,
        persistent: true
      }).onOk(() => {
        this.$store.dispatch(`${UNIT.namespace}/${UNIT.actions.DELETE_UNIT}`, unit.row).then(response => {
          this.$q.notify({
            type: 'positive',
            message: `Successfully deleted ${unit.row.name}.`,
            position: 'top'
          })
        }, errors => {
          console.log(errors)
        })
      })
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
