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
    <template v-slot:body-cell-actions="props">
            <q-td :props="props">
              <q-btn dense round flat color="grey" @click="editRow(props)" icon="edit"></q-btn>
              <q-btn dense round flat color="grey" @click="deleteRow(props)" icon="delete"></q-btn>
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
    this.$store.commit('units/SET_UNITS', [
      {
        id: '918857d6-fcbf-4c93-8412-e18d3dba0435',
        name: 'Unit 1',
        funds: '1000',
        address: 'Nasipit Rd. Talamaban Cebu',
        actions: ''
      },
      {
        id: '918857d6-fcbf-4c93-8412-e18d3dba0435',
        name: 'Unit 2',
        funds: '6789',
        address: 'Nasipit Rd. Talamaban Cebu',
        actions: ' '
      },
      {
        id: '918857d6-fcbf-4c93-8412-e18d3dba0435',
        name: 'Unit 3',
        funds: '4563',
        address: 'Nasipit Rd. Talamaban Cebu',
        actions: ' '
      },
      {
        id: '918857d6-fcbf-4c93-8412-e18d3dba0435',
        name: 'Unit 4',
        funds: '1234',
        address: 'Nasipit Rd. Talamaban Cebu',
        actions: ' '
      },
      {
        id: '918857d6-fcbf-4c93-8412-e18d3dba0435',
        name: 'Unit 5',
        funds: '1200',
        address: 'Nasipit Rd. Talamaban Cebu',
        actions: ' '
      }
    ])
  },
  computed: {
    ...mapGetters({
      units: 'units/getUnits',
      tableHeader: 'units/getTableHeader'
    })
  },
  methods: {
    editRow (props) {
      console.log('this is edit', props)
    },
    deleteRow (props) {
      console.log('this is delete', props)
    }
  }
}
</script>
