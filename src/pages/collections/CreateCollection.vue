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
        <q-breadcrumbs-el label="Collections" to="/collections" />
        <q-breadcrumbs-el label="Create Collection" />
      </q-breadcrumbs>
    </div>

<q-card>
      <q-card-section>
        <div class="text-h6">Create Collection</div>
      </q-card-section>
      <q-card-section>
        <q-form ref="collectionForm" >
          <div class="text-subtitle1 q-ma-sm">Collection Information</div>
          <div class="row q-col-gutter-sm">
            <q-select
              class="col-6"
              v-model="newCollection.unit_id"
              :options="units"
              label="Unit"
              options-dense
              emit-value
              dense
              outlined
              :error="hasError.unit_id.error"
              :error-message="hasError.unit_id.message"
              :rules="[(val) => validator.required(val, 'unit_id')]"
            />
            <q-input
              class="col col-md-6"
              v-model="newCollection.collected_by"
              type="text"
              label="Collector"
              outlined
              dense
              :error="hasError.collected_by.error"
              :error-message="hasError.collected_by.message"
              :rules="[(val) => validator.required(val, 'collector')]"
            />
            </div>
            <div class="row q-col-gutter-sm">
            <q-input
              class="col col-md-6"
              v-model="newCollection.total"
              type="number"
              label="Total"
              outlined
              dense
              :error="hasError.total.error"
              :error-message="hasError.total.message"
              :rules="[(val) => validator.required(val, 'total')]"
            />
            <q-input
              class="col col-md-6 items-center"
              v-model="newCollection.collected_at"
              type="date"
              outlined
              dense
              :error="hasError.collected_at.error"
              :error-message="hasError.collected_at.message"
              :rules="[(val) => validator.required(val, 'date collected')]"
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
        @click="createCollection()"
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
import COLLECTION from 'src/store/types/collections'
import UNIT from 'src/store/types/units'
import Validation from 'src/util/rules'
import AppConstant from 'src/constant/app'

export default {
  name: 'Create Collection',
  data () {
    return {
      newCollection: {
        unit_id: '',
        collected_by: '',
        total: 0,
        collected_at: ''
      },
      units: [],
      validator: Validation,
      loading: false,
      hasError: {
        unit_id: {
          message: null,
          error: false
        },
        collected_by: {
          message: null,
          error: false
        },
        total: {
          message: null,
          error: false
        },
        collected_at: {
          message: null,
          error: false
        }
      }
    }
  },
  async mounted () {
    this.$store.commit('layout/SET_HEADER', 'Collections')
    await this.$store.dispatch(
      `${UNIT.namespace}/${UNIT.actions.GET_UNITS}`
    ).then(response => {
      this.units = response
    })
  },
  methods: {
    async createCollection () {
      await this.$store.dispatch(`${COLLECTION.namespace}/${COLLECTION.actions.CREATE_COLLECTION}`, this.newCollection).then(response => {
        this.$q.notify(AppConstant.SUCCESS_MSG(`Successfully created a collection from  ${this.newCollection.unit_id}.`))
        this.$router.push({ name: 'collections' })
          .catch((errors) => {
            this.hasError.unit_id.error = true
            this.hasError.unit_id.message = errors.unit_id[0]
            this.hasError.collected_by.error = true
            this.hasError.collected_by.message = errors.collected_by[0]
            this.hasError.total.error = true
            this.hasError.total.message = errors.total[0]
            this.hasError.collected_at.error = true
            this.hasError.collected_at.message = errors.collected_at[0]
          })
          .finally(() => {
            this.loading = false
          })
      })
    }
  }
}
</script>
