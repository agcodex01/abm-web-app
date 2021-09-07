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

<q-card>
      <q-card-section>
        <div class="text-h6">Create Unit</div>
      </q-card-section>
      <q-card-section>
        <q-form ref="unitForm" >
          <div class="text-subtitle1 q-ma-sm">Unit Information</div>
          <div class="row q-col-gutter-sm">
            <q-input
              class="col col-md-6"
              v-model="newUnit.name"
              type="text"
              label="Name"
              outlined
              dense
              :error="hasError.name.error"
              :error-message="hasError.name.message"
              :rules="[(val) => validator.required(val, 'name')]"
            />
            <q-input
              class="col col-md-6"
              v-model="newUnit.fund"
              type="number"
              label="Funds"
              outlined
              dense
              :error="hasError.name.error"
              :error-message="hasError.name.message"
              :rules="[(val) => validator.required(val, 'name')]"
            />
          </div>

          <div class="text-subtitle1 q-ma-sm">Unit Address/Location</div>
          <div class="row q-col-gutter-sm">
            <q-input
              class="col col-md-6"
              v-model="newUnit.postal_code"
              type="text"
              label="Postal Code"
              outlined
              dense
              :error="hasError.name.error"
              :error-message="hasError.name.message"
              :rules="[(val) => validator.required(val, 'name')]"
            />
            <q-input
              class="col col-md-6"
              v-model="newUnit.province"
              type="text"
              label="Province"
              outlined
              dense
              :error="hasError.name.error"
              :error-message="hasError.name.message"
              :rules="[(val) => validator.required(val, 'name')]"
            />
            <q-input
              class="col col-md-6"
              v-model="newUnit.city"
              type="text"
              label="City"
              outlined
              dense
            />
            <q-input
              class="col col-md-6"
              v-model="newUnit.municipality"
              type="text"
              label="Municipality"
              outlined
              dense
              :error="hasError.name.error"
              :error-message="hasError.name.message"
              :rules="[(val) => validator.required(val, 'name')]"
            />
            <q-input
              class="col col-md-6"
              v-model="newUnit.barangay"
              type="text"
              label="Barangay"
              outlined
              dense
              :error="hasError.name.error"
              :error-message="hasError.name.message"
              :rules="[(val) => validator.required(val, 'name')]"
            />
            <q-input
              class="col col-md-6"
              v-model="newUnit.street"
              type="text"
              label="Street"
              outlined
              dense
            />
          </div>
        </q-form>
      </q-card-section>
    </q-card>

    <q-footer
      class="bg-white q-py-sm q-px-md flex justify-between align-center"
      reveal
      bordered
    >
      <q-btn
        size="sm"
        icon="chevron_left"
        align="center"
        unelevated
        outline
        padding="sm md"
        color="primary"
        @click="$router.back"
      >
        Back
      </q-btn>
      <q-btn
        size="sm"
        color="primary"
        padding="sm lg"
        label="Save"
        @click="createUnit()"
      >
        <template v-slot:loading>
          <q-spinner class="on-left" />
          Loading...
        </template>
      </q-btn>
    </q-footer>

  </q-page>
</template>
<script>
import UNIT from 'src/store/types/units'
import Validation from 'src/util/rules'
import AppConstant from 'src/constant/app'
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
      },
      validator: Validation,
      loading: false,
      hasError: {
        name: {
          message: null,
          error: false
        }
      }
    }
  },
  mounted () {
    this.$store.commit('layout/SET_HEADER', 'Create Unit')
  },
  methods: {
    async createUnit () {
      await this.$store.dispatch(`${UNIT.namespace}/${UNIT.actions.CREATE_UNIT}`, this.newUnit).then(response => {
        this.$q.notify(AppConstant.SUCCESS_MSG(`Successfully created ${this.newUnit.name}.`))
        this.$router.push({ name: 'units' })
          .catch((errors) => {
            this.hasError.name.error = true
            this.hasError.name.message = errors.name[0]
          })
          .finally(() => {
            this.loading = false
          })
      })
    }
  }
}
</script>
