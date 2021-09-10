<template>
  <q-page padding>
    <div class="q-mt-md q-mb-xl">
      <q-breadcrumbs class="align-center q-pa-sm" style="font-size: 14px">
        <template v-slot:separator>
          <q-icon size="24px" name="chevron_right" />
        </template>
        <q-breadcrumbs-el to="/" label="Adopisoft Billing Machine" />
        <q-breadcrumbs-el to="/units" label="Units" />
        <q-breadcrumbs-el label="Update" />
      </q-breadcrumbs>
    </div>

    <q-card>
      <q-card-section>
        <div class="text-h6">Update Unit</div>
      </q-card-section>
      <q-card-section>
        <q-form ref="unitForm" >
          <div class="text-subtitle1 q-ma-sm">Unit Information</div>
          <div class="row q-col-gutter-sm">
            <q-input
              class="col col-md-6"
              v-model="updatedUnit.name"
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
              v-model="updatedUnit.fund"
              type="number"
              label="Funds"
              outlined
              dense
              :error="hasError.name.error"
              :error-message="hasError.name.message"
              :rules="[(val) => validator.required(val, 'fund')]"
            />
          </div>

          <div class="text-subtitle1 q-ma-sm">Unit Address/Location</div>
          <div class="row q-col-gutter-sm">
            <q-input
              class="col col-md-6"
              v-model="updatedUnit.postal_code"
              type="text"
              label="Postal Code"
              outlined
              dense
              :error="hasError.name.error"
              :error-message="hasError.name.message"
              :rules="[(val) => validator.required(val, 'postal_code')]"
            />
            <q-input
              class="col col-md-6"
              v-model="updatedUnit.province"
              type="text"
              label="Province"
              outlined
              dense
              :error="hasError.name.error"
              :error-message="hasError.name.message"
              :rules="[(val) => validator.required(val, 'province')]"
            />
            <q-input
              class="col col-md-6"
              v-model="updatedUnit.city"
              type="text"
              label="City"
              outlined
              dense
            />
            <q-input
              class="col col-md-6"
              v-model="updatedUnit.municipality"
              type="text"
              label="Municipality"
              outlined
              dense
              :error="hasError.name.error"
              :error-message="hasError.name.message"
              :rules="[(val) => validator.required(val, 'municipality')]"
            />
            <q-input
              class="col col-md-6"
              v-model="updatedUnit.barangay"
              type="text"
              label="Barangay"
              outlined
              dense
              :error="hasError.name.error"
              :error-message="hasError.name.message"
              :rules="[(val) => validator.required(val, 'barangay')]"
            />
            <q-input
              class="col col-md-6"
              v-model="updatedUnit.street"
              type="text"
              label="Street"
              outlined
              dense
              :error="hasError.name.error"
              :error-message="hasError.name.message"
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
        @click="onUpdate"
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
import { mapActions, mapGetters } from 'vuex'
import UNIT from 'src/store/types/units'
import Validation from 'src/util/rules'
import AppConstant from 'src/constant/app'

export default {
  name: 'Update Unit',
  data () {
    return {
      id: this.$route.params.id,
      updatedUnit: {
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
        },
        fund: {
          message: null,
          error: false
        },
        postal_code: {
          message: null,
          error: false
        },
        province: {
          message: null,
          error: false
        },
        municipality: {
          message: null,
          error: false
        },
        barangay: {
          message: null,
          error: false
        }
      }
    }
  },
  methods: {
    ...mapActions({
      updateUnit: `${UNIT.namespace}/${UNIT.actions.UPDATE_UNIT}`
    }),
    async onUpdate () {
      const validated = await this.$refs.unitForm.validate()
      if (validated) {
        this.loading = true
        this.updateUnit({ id: this.updatedUnit.id, unit: this.updatedUnit })
          .then((unit) => {
            this.hasError.name.error = false
            this.$router.push({ name: 'units' })
            this.$q.notify(
              AppConstant.SUCCESS_MSG(
                `Successfully updated ${this.updatedUnit.name} unit.`
              )
            )
          })
          .catch((errors) => {
            this.hasError.name.error = true
            this.hasError.name.message = errors.name[0]
          })
          .finally(() => {
            this.loading = false
          })
      }
    }
  },
  computed: {
    ...mapGetters({
      unitData: `${UNIT.namespace}/${UNIT.getters.GET_UNIT}`
    })
  },
  async mounted () {
    this.$store.commit('layout/SET_HEADER', 'Units')
    await this.$store.dispatch(
      `${UNIT.namespace}/${UNIT.actions.GET_UNIT}`,
      this.$route.params.id
    )
    this.updatedUnit = Object.assign({}, this.unitData)
  }
}
</script>
