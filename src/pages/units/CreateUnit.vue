<template>
  <q-page padding>
    <div class="flex justify-between align-center q-mt-md q-mb-xl">
      <q-breadcrumbs class="align-center q-pa-sm" style="font-size: 14px">
        <template v-slot:separator>
          <q-icon size="24px" name="chevron_right" />
        </template>
        <q-breadcrumbs-el to="/" label="Adopisoft Billing Machine" />
        <q-breadcrumbs-el label="Units" to="/units" />
        <q-breadcrumbs-el label="Create" />
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
              disable
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
              type="number"
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
              v-model="newUnit.city_municipality"
              type="text"
              label="City/Municipality"
              outlined
              dense
              :error="hasError.city_municipality.error"
              :error-message="hasError.city_municipality.message"
              :rules="[(val) => validator.required(val, 'city/municipality')]"
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
              class="col col-md-12"
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
import { resetErrorValues, setErrorValues } from 'src/util/validation'
import { mapGetters } from 'vuex'
export default {
  name: 'Create Unit',
  data () {
    return {
      newUnit: {
        name: '',
        fund: 0,
        postal_code: '',
        province: '',
        city_municipality: '',
        barangay: '',
        street: ''
      },
      validator: Validation,
      hasError: UnitErrors
    }
  },
  computed: {
    ...mapGetters({
      loading: `${UNIT.namespace}/${UNIT.getters.GET_LOADING}`
    })
  },
  mounted () {
    this.$store.commit('layout/SET_HEADER', 'Units')
    resetErrorValues(this.hasError)
  },
  methods: {
    async createUnit () {
      resetErrorValues(this.hasError)
      this.$refs.unitForm.validate().then(async (valid) => {
        if (valid) {
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
              setErrorValues(this.hasError, errors)
            })
        }
      })
    }
  }
}
</script>
