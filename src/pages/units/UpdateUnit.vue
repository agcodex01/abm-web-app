<template>
  <q-page padding>
    <div class="flex justify-between align-center q-mt-md q-mb-xl">
      <q-breadcrumbs class="align-center q-pa-sm" style="font-size: 14px">
        <template v-slot:separator>
          <q-icon size="24px" name="chevron_right" />
        </template>
        <q-breadcrumbs-el to="/" label="Adopisoft Billing Machine" />
        <q-breadcrumbs-el to="/units" label="Units" />
        <q-breadcrumbs-el label="Update" />
      </q-breadcrumbs>
      <q-btn
        size="sm"
        outline
        color="primary"
        label="View Config"
        @click="openConfig"
      />
    </div>

    <q-card>
      <q-card-section>
        <div class="text-h6">Update Unit</div>
      </q-card-section>
      <q-card-section>
        <q-form ref="unitForm">
          <div class="text-subtitle1 q-ma-sm">Details</div>
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
              disable
              :error="hasError.fund.error"
              :error-message="hasError.fund.message"
            />
          </div>

          <div class="text-subtitle1 q-ma-sm">Address</div>
          <div class="row q-col-gutter-sm">
            <q-input
              class="col col-md-6"
              v-model="updatedUnit.postal_code"
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
              v-model="updatedUnit.province"
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
              v-model="updatedUnit.city_municipality"
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
              v-model="updatedUnit.barangay"
              type="text"
              label="Barangay"
              outlined
              dense
            />
            <q-input
              class="col col-md-12"
              v-model="updatedUnit.street"
              type="text"
              label="Street"
              outlined
              dense
            />
          </div>
        </q-form>
      </q-card-section>
    </q-card>
    <q-dialog v-model="openConfigDialog" persistent position="top">
      <q-card class="q-mt-lg q-pb-sm" style="min-width: 450px">
        <q-card-section class="q-pb-none">
          <div class="text-h6 text-weight-regular no-margin">Unit Config</div>
        </q-card-section>
        <q-card-section>
          <div class="text-subtitle1">Uuid</div>
          <div class="text-subtitle2 q-mb-lg" v-text="updatedUnit.id"></div>
          <div class="text-subtitle1 flex justify-between align-center q-mb-md">
            Token
            <q-btn
              v-if="!config?.token"
              size="sm"
              color="primary"
              label="Create"
              :loading="configLoading"
              @click="createConfig(updatedUnit.id)"
            />
            <q-btn
              v-else
              size="sm"
              color="negative"
              label="Delete"
              :loading="configLoading"
              @click="deleteConfig(updatedUnit.id)"
            />
          </div>
          <div
            v-if="config?.token"
            class="text-subtitle2"
            v-text="config?.token"
          />
          <div
            v-else-if="configLoading"
            class="text-subtitle2"
            v-text="'Processing....'"
          />
          <div
            v-else
            class="text-subtitle2"
            v-text="'No token for this unit'"
          />
        </q-card-section>
        <q-card-actions align="right">
          <q-btn
            size="sm"
            padding="8px 16px"
            outline
            label="Close"
            color="primary"
            class="full-width"
            v-close-popup
          />
        </q-card-actions>
      </q-card>
    </q-dialog>
    <q-dialog v-model="openDisableDialog" persistent position="top">
      <q-card class="q-mt-lg q-pb-sm" style="min-width: 450px">
        <q-card-section class="q-pb-none">
          <div class="text-h6 text-weight-regular no-margin">{{ updatedUnit.disabled ? 'Enable': 'Disable'}} Unit</div>
        </q-card-section>
        <q-card-section>
          <div class="text-subtitle2">Are you sure you want to {{ updatedUnit.disabled ? 'enable': 'disable'}} unit <b>{{ updatedUnit.name }}</b> ? </div>
        </q-card-section>
        <q-card-actions align="right">
          <q-btn
            size="sm"
            padding="8px 16px"
            outline
            label="Cancel"
            color="primary"
            v-close-popup
          />
          <q-btn
            size="sm"
            padding="8px 16px"
            label="Confirm"
            color="primary"
            @click="disableUnitFn"
          />
        </q-card-actions>
      </q-card>
    </q-dialog>
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
      <div class="q-gutter-sm">
        <q-btn
          v-if="updatedUnit.disabled"
          outline
          color="positive"
          label="Enable Unit"
          size="sm"
          padding="sm lg"
          @click="openDisableDialogFn"
        />
        <q-btn
          v-else
          outline
          color="negative"
          label="Disable Unit"
          size="sm"
          padding="sm lg"
          @click="openDisableDialogFn"
        />
        <q-btn
          size="sm"
          color="primary"
          padding="sm lg"
          label="Save"
          :loading="loading"
          :style="{ width: loading ? '150px' : '' }"
          @click="onUpdate"
        >
          <template v-slot:loading>
            <q-spinner class="on-left" />
            Loading...
          </template>
        </q-btn>
      </div>
    </q-footer>
  </q-page>
</template>
<script>
import { mapActions, mapGetters } from 'vuex'
import UNIT from 'src/store/types/units'
import Validation from 'src/util/rules'
import AppConstant from 'src/constant/app'
import UnitErrors from 'src/store/modules/units/errors'
import { resetErrorValues, setErrorValues } from 'src/util/validation'
import { Notify } from 'quasar'

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
        city_municipality: '',
        barangay: '',
        street: '',
        disabled: false
      },
      validator: Validation,
      loading: false,
      hasError: UnitErrors,
      openConfigDialog: false,
      openDisableDialog: false
    }
  },
  methods: {
    ...mapActions({
      updateUnit: `${UNIT.namespace}/${UNIT.actions.UPDATE_UNIT}`,
      createConfig: `${UNIT.namespace}/${UNIT.actions.CREATE_CONFIG}`,
      deleteConfig: `${UNIT.namespace}/${UNIT.actions.DELETE_CONFIG}`,
      disableUnit: `${UNIT.namespace}/${UNIT.actions.DISABLE_UNIT}`
    }),
    async onUpdate () {
      resetErrorValues(this.hasError)
      this.$refs.unitForm.validate().then((valid) => {
        if (valid) {
          this.loading = true
          this.updateUnit({ id: this.updatedUnit.id, unit: this.updatedUnit })
            .then((unit) => {
              this.$q.notify(
                AppConstant.SUCCESS_MSG(
                  `Successfully updated ${this.updatedUnit.name} unit.`
                )
              )
              this.$router.push({
                name: 'units'
              })
            })
            .catch((errors) => {
              setErrorValues(this.hasError, errors)
            })
            .finally(() => {
              this.loading = false
            })
        }
      })
    },
    async openConfig () {
      this.openConfigDialog = true
      await this.$store.dispatch(
        `${UNIT.namespace}/${UNIT.actions.GET_CONFIG}`,
        this.updatedUnit.id
      )
    },
    openDisableDialogFn () {
      this.openDisableDialog = true
    },
    async disableUnitFn () {
      this.openDisableDialog = false
      await this.disableUnit({
        id: this.updatedUnit.id,
        status: (!this.updatedUnit.disabled) ? 1 : 0
      }).then(success => {
        if (success) {
          this.updatedUnit.disabled = !this.updatedUnit.disabled
          Notify.create({
            position: 'top',
            type: 'positive',
            message: `Successfully ${!this.updatedUnit.disabled ? 'enabled' : 'disabled'} ${this.updatedUnit.name}.`
          })
        }
      }).catch(() => {
        Notify.create({
          position: 'top',
          type: 'negative',
          message: `Failed to  ${!this.updatedUnit.disabled ? 'enabled' : 'disabled'} ${this.updatedUnit.name}.`
        })
      })
    }
  },
  computed: {
    ...mapGetters({
      unitData: `${UNIT.namespace}/${UNIT.getters.GET_UNIT}`,
      config: `${UNIT.namespace}/${UNIT.getters.GET_CONFIG}`,
      configLoading: `${UNIT.namespace}/${UNIT.getters.LOADING_CONFIG}`
    })
  },
  async mounted () {
    this.$store.commit('layout/SET_HEADER', 'Units')
    resetErrorValues(this.hasError)
    await this.$store.dispatch(
      `${UNIT.namespace}/${UNIT.actions.GET_UNIT}`,
      this.$route.params.id
    )
    this.updatedUnit = Object.assign({}, this.unitData)
  }
}
</script>
