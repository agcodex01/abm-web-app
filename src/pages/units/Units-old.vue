<template>
  <q-page padding>
    <div class="q-pa-md q-gutter-sm">
      <q-breadcrumbs>
        <q-breadcrumbs-el icon="home" to="/" />
        <q-breadcrumbs-el label="Units" icon="widgets" to="/start/pick-quasar-flavour" />
      </q-breadcrumbs>
      <q-btn align="around" class="absolute-top-right q-ma-md" @click="$router.replace('/units/create-unit')" color="primary" label="Create" />
    </div>
    <q-table
      class="q-mt-lg half-width"
      title="Units"
      :rows="units"
      :columns="tableHeader"
      row-key="id"
      :filter="filter"
    >
    <template v-slot:body-cell-actions="unit">
            <q-td :value="unit.id">
              <q-btn dense round flat color="grey" icon="edit" @click="editUnit(unit)"></q-btn>
              <q-btn dense round flat color="grey" @click="deleteRow(unit)" icon="delete"></q-btn>
            </q-td>
    </template>
    <template v-slot:top-right>
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

export default {
  name: 'Units',
  data () {
    return {
      filter: ''
    }
  },
  mounted () {
    this.$store.commit('layout/SET_HEADER', 'Units')
    this.$store.dispatch('units/getUnits')
  },
  computed: {
    ...mapGetters({
      units: 'units/getUnits',
      tableHeader: 'units/getTableHeader'
    })
  },
  methods: {
    editUnit (unit) {
      this.$store.dispatch('units/getSelectedUnit', unit)
    },
    deleteRow (unit) {
      this.$q.dialog({
        title: 'Confirm',
        message: 'Are you sure you want to delete ' + unit.row.name + '?',
        cancel: true,
        persistent: true
      }).onOk(() => {
        this.$store.dispatch('units/deleteUnit', unit)
        this.$q.notify(unit.row.name + ' deleted!')
      })
    }
  }
}
</script>
