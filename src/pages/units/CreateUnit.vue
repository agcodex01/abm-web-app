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
        <q-breadcrumbs-el label="Units" to="/units" />
        <q-breadcrumbs-el label="Create Unit" />
      </q-breadcrumbs>
    </div>

    <div>
      <h5 class="text-grey-7">Information</h5>
      <div class="row q-col-gutter-sm">
        <div class="col col-md-6">
          <q-input v-model="newUnit.name" outlined label="Name"/>
        </div>
        <div class="col col-md-6">
          <q-input v-model="newUnit.fund" outlined label="Funds" type="number" />
        </div>
      </div>
      <h5 class="text-grey-7">Address or Location</h5>
      <div class="row q-col-gutter-sm">
        <div class="col col-md-4">
          <q-input v-model="newUnit.postal_code" outlined label="Postal Code"/>
        </div>
        <div class="col col-md-4">
          <q-input v-model="newUnit.province" outlined label="Province"/>
        </div>
        <div class="col col-md-4">
          <q-input v-model="newUnit.city" outlined label="City" />
        </div>
         <div class="col col-md-4">
          <q-input v-model="newUnit.municipality" outlined label="Municipality"/>
        </div>
        <div class="col col-md-4">
          <q-input v-model="newUnit.barangay" outlined label="Barangay"/>
        </div>
        <div class="col col-md-4">
          <q-input v-model="newUnit.street" outlined label="Street" />
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
        @click="reset()"
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
      newUnit: {
        name: '',
        fund: 0,
        postal_code: '',
        province: '',
        city: '',
        municipality: '',
        barangay: '',
        street: ''
      }
    }
  },
  mounted () {
    this.$store.commit('layout/SET_HEADER', 'Create Unit')
  },
  methods: {
    async createUnit () {
      await this.$store.dispatch(`${UNIT.namespace}/${UNIT.actions.CREATE_UNIT}`, this.newUnit).then(response => {
        this.$router.push({ name: 'units' })
      }, errors => {
        console.log(errors + 'Error')
      })
    },
    reset () {
      this.newUnit = {}
    }
  }
}
</script>
