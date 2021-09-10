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
              :error="hasError.name.error"
              :error-message="hasError.name.message"
              :rules="[(val) => validator.required(val, 'name')]"
            />
            <q-input
              class="col col-md-6"
              v-model="newCollection.collected_by"
              type="text"
              label="Collector"
              outlined
              dense
              :error="hasError.name.error"
              :error-message="hasError.name.message"
              :rules="[(val) => validator.required(val, 'name')]"
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
              :error="hasError.name.error"
              :error-message="hasError.name.message"
              :rules="[(val) => validator.required(val, 'name')]"
            />
            <q-input
              class="col col-md-6 items-center"
              v-model="newCollection.collected_at"
              type="date"
              outlined
              dense
              :error="hasError.name.error"
              :error-message="hasError.name.message"
              :rules="[(val) => validator.required(val, 'name')]"
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
      units: [
        {
          label: 'Unit 1',
          value: '94513265-62f4-403e-a2b6-d0eb0dadd27c'
        },
        {
          label: 'Unit 2',
          value: '94513265-7ce0-4457-9d9e-10bc9ccef1c2'
        }
      ],
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
  async mounted () {
    this.$store.commit('layout/SET_HEADER', 'Create Collection')
    await this.$store.dispatch(
      `${UNIT.namespace}/${UNIT.actions.GET_UNITS}`
    )
  },
  methods: {
    async createCollection () {
      await this.$store.dispatch(`${COLLECTION.namespace}/${COLLECTION.actions.CREATE_COLLECTION}`, this.newCollection).then(response => {
        this.$q.notify(AppConstant.SUCCESS_MSG(`Successfully created a collection from  ${this.newCollection.unit_id}.`))
        this.$router.push({ name: 'collections' })
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
