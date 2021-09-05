<template>
  <q-page padding>
    <div class="q-pa-md q-gutter-sm">
      <q-breadcrumbs>
        <q-breadcrumbs-el icon="home" to="/" />
        <q-breadcrumbs-el label="Units" to="/units" />
        <q-breadcrumbs-el label="Create Unit" />
      </q-breadcrumbs>
    </div>
    <div>
      <h5 class="text-grey-7">Information</h5>
      <div class="row q-col-gutter-sm">
        <div class="col col-md-6">
          <q-input v-model="name" outlined label="Name"/>
        </div>
        <div class="col col-md-6">
          <q-input v-model="fund" outlined label="Funds" type="number" />
        </div>
      </div>
      <h5 class="text-grey-7">Address or Location</h5>
      <div class="row q-col-gutter-sm">
        <div class="col col-md-4">
          <q-input v-model="postal_code" outlined label="Postal Code"/>
        </div>
        <div class="col col-md-4">
          <q-input v-model="province" outlined label="Province"/>
        </div>
        <div class="col col-md-4">
          <q-input v-model="city" outlined label="City" />
        </div>
         <div class="col col-md-4">
          <q-input v-model="municipality" outlined label="Municipality"/>
        </div>
        <div class="col col-md-4">
          <q-input v-model="barangay" outlined label="Barangay"/>
        </div>
        <div class="col col-md-4">
          <q-input v-model="street" outlined label="Street" />
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
        @click="createUnit()"
        color="primary"
        label="Save"
      />
    </div>
  </q-page>
</template>
<script>
import UNIT from 'src/store/types/units'
export default {
  name: 'Create Unit',
  data () {
    return {
      name: '',
      fund: 0,
      postal_code: '',
      province: '',
      city: '',
      municipality: '',
      barangay: '',
      street: ''
    }
  },
  mounted () {
    this.$store.commit('layout/SET_HEADER', 'Create Unit')
  },
  methods: {
    async createUnit () {
      const newUnit = { name: this.name, fund: this.fund, postal_code: this.postal_code, province: this.province, city: this.city, municipality: this.municipality, barangay: this.barangay, street: this.street }
      await this.$store.dispatch(`${UNIT.namespace}/${UNIT.actions.CREATE_UNIT}`, newUnit)
    }
  }
}
</script>
