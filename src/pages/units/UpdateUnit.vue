<template>
  <q-page padding>
    <div class="q-pa-md q-gutter-sm">
      <q-breadcrumbs>
        <q-breadcrumbs-el icon="home" to="/" />
        <q-breadcrumbs-el label="Units" to="/units" />
        <q-breadcrumbs-el label="Update Unit" />
      </q-breadcrumbs>
    </div>
    <div>
      <h5 class="text-grey-7">Unit # : {{unit.key}}</h5>
      <h5 class="text-grey-7">Information</h5>
      <div class="row q-col-gutter-sm">
        <div class="col col-md-6">
          <q-input v-model="unit.row.name" outlined label="Name"/>
        </div>
        <div class="col col-md-6">
          <q-input v-model="unit.row.fund" outlined label="Funds" type="number" />
        </div>
      </div>
      <h5 class="text-grey-7">Address or Location</h5>
      <div class="row q-col-gutter-sm">
        <div class="col col-md-4">
          <q-input v-model="unit.row.postal_code" outlined label="Postal Code"/>
        </div>
        <div class="col col-md-4">
          <q-input v-model="unit.row.province" outlined label="Province"/>
        </div>
        <div class="col col-md-4">
          <q-input v-model="unit.row.city" outlined label="City" />
        </div>
         <div class="col col-md-4">
          <q-input v-model="unit.row.municipality" outlined label="Municipality"/>
        </div>
        <div class="col col-md-4">
          <q-input v-model="unit.row.barangay" outlined label="Barangay"/>
        </div>
        <div class="col col-md-4">
          <q-input v-model="unit.row.street" outlined label="Street" />
        </div>
      </div>
    </div>
    <div class="absolute-bottom-right q-ma-md">
      <q-btn
        align="around"
        class="q-mr-md"
        @click="$router.replace('/units')"
        label="Cancel"
      />
      <q-btn
        align="around"
        class="q-mr-md"
        @click="$router.replace('/units/create-unit')"
        color="negative"
        label="Reset"
      />
      <q-btn
        align="around"
        @click="saveUpdatedUnit"
        color="primary"
        label="Save"
      />
    </div>
  </q-page>
</template>
<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Update Unit',
  data () {
    return {
      id: this.$route.params.id
    }
  },
  mounted () {
    this.$store.commit('layout/SET_HEADER', 'Update Unit')
  },
  computed: {
    ...mapGetters({
      tableHeader: 'units/getTableHeader',
      selectedUnit: 'units/getSelectedUnit'
    }),
    unit: {
      get () {
        return this.selectedUnit
      },
      set (value) {
        this.$store.commit('units/SET_SELECTED_UNIT', value)
      }
    }
  },
  methods: {
    async saveUpdatedUnit () {
      await this.$store.dispatch('units/editUnit', this.unit)
      this.$router.push({ name: 'units' })
    }
  }
}
</script>
