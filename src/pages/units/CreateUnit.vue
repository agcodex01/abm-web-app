<template>
  <q-page padding>
    <div class="flex justify-between align-center q-mt-md q-mb-xl">
      <q-breadcrumbs class="align-center q-pa-sm" style="font-size: 14px">
        <template v-slot:separator>
          <q-icon size="24px" name="chevron_right" />
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
        <q-form ref="unitForm">
          <div class="text-subtitle1 q-ma-sm">Information</div>
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
              :error="hasError.fund.error"
              :error-message="hasError.fund.message"
              :rules="[(val) => validator.required(val, 'fund')]"
            />
          </div>

          <div class="text-subtitle1 q-ma-sm">Address</div>
          <div class="row q-col-gutter-sm">
            <q-input
              class="col col-md-6"
              v-model="newUnit.postal_code"
              type="text"
              label="Postal Code"
              outlined
              dense
              :error="hasError.postal_code.error"
              :error-message="hasError.postal_code.message"
              :rules="[(val) => validator.required(val, 'postal_code')]"
            />
            <q-input
              class="col col-md-6"
              v-model="newUnit.province"
              type="text"
              label="Province"
              outlined
              dense
              :error="hasError.province.error"
              :error-message="hasError.province.message"
              :rules="[(val) => validator.required(val, 'province')]"
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
              :error="hasError.municipality.error"
              :error-message="hasError.municipality.message"
              :rules="[(val) => validator.required(val, 'municipality')]"
            />
            <q-input
              class="col col-md-6"
              v-model="newUnit.barangay"
              type="text"
              label="Barangay"
              outlined
              dense
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
        :loading="loading"
        :style="{ width: loading ? '150px' : '' }"
        @click="createUnit"
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
import UnitErrors from 'src/store/modules/units/errors'
export default {
  name: 'Create Unit',
  data () {
    return {
      newUnit: {
        name: '',
        fund: null,
        postal_code: '',
        province: '',
        city: '',
        municipality: '',
        barangay: '',
        street: ''
      },
      validator: Validation,
      loading: false,
      hasError: UnitErrors
    }
  },
  mounted () {
    this.$store.commit('layout/SET_HEADER', 'Units')
  },
  methods: {
    async createUnit () {
      this.$refs.unitForm.validate().then(async (valid) => {
        if (valid) {
          this.loading = true
          await this.$store
            .dispatch(
              `${UNIT.namespace}/${UNIT.actions.CREATE_UNIT}`,
              this.newUnit
            )
            .then((unit) => {
              this.$q.notify(
                AppConstant.SUCCESS_MSG(`Successfully created ${unit.name}.`)
              )
              this.$router.push({
                name: 'update_unit',
                params: { id: unit.id }
              })
            })
            .catch((errors) => {
              if ('name' in errors) {
                this.hasError.name.error = true
                this.hasError.name.message = errors.name[0]
              }

              if ('fund' in errors) {
                this.hasError.fund.error = true
                this.hasError.fund.message = errors.fund[0]
              }
              if ('postal_code' in errors) {
                this.hasError.postal_code.error = true
                this.hasError.postal_code.message = errors.postal_code[0]
              }

              if ('province' in errors) {
                this.hasError.province.error = true
                this.hasError.province.message = errors.province[0]
              }

              if ('municipality' in errors) {
                this.hasError.municipality.error = true
                this.hasError.municipality.message = errors.municipality[0]
              }
            })
            .finally(() => {
              this.loading = false
            })
        }
      })
    }
  }
}
</script>
