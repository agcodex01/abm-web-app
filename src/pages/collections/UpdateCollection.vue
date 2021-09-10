<template>
  <q-page padding>
    <div class="q-mt-md q-mb-xl">
      <q-breadcrumbs class="align-center q-pa-sm" style="font-size: 14px">
        <template v-slot:separator>
          <q-icon size="24px" name="chevron_right" />
        </template>
        <q-breadcrumbs-el to="/" label="Adopisoft Billing Machine" />
        <q-breadcrumbs-el to="/collections" label="Collections" />
        <q-breadcrumbs-el label="Update" />
      </q-breadcrumbs>
    </div>

    <q-card>
      <q-card-section>
        <div class="text-h6">Update Collection</div>
      </q-card-section>
      <q-card-section>
        <q-form ref="collectionForm" >
          <div class="text-subtitle1 q-ma-sm">Collection Information</div>
          <div class="row q-col-gutter-sm">
            <q-select
              class="col-6"
              v-model="updatedCollection.unit_id"
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
              v-model="updatedCollection.collected_by"
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
              v-model="updatedCollection.total"
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
              v-model="updatedCollection.collected_at"
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
import COLLECTION from 'src/store/types/collections'
import Validation from 'src/util/rules'
import AppConstant from 'src/constant/app'
export default {
  name: 'Update Collection',
  data () {
    return {
      id: this.$route.params.id,
      updatedCollection: {
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
  methods: {
    ...mapActions({
      updateCollection: `${COLLECTION.namespace}/${COLLECTION.actions.UPDATE_COLLECTION}`
    }),
    async onUpdate () {
      const validated = await this.$refs.collectionForm.validate()
      if (validated) {
        this.loading = true
        this.updateCollection({ id: this.updatedCollection.id, collection: this.updatedCollection })
          .then((collection) => {
            this.hasError.name.error = false
            this.$router.push({ name: 'collections' })
            this.$q.notify(
              AppConstant.SUCCESS_MSG(
                `Successfully updated ${this.updatedCollection.id} collection.`
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
      collectionData: `${COLLECTION.namespace}/${COLLECTION.getters.GET_COLLECTION}`
    })
  },
  async mounted () {
    this.$store.commit('layout/SET_HEADER', 'Collections')
    await this.$store.dispatch(
      `${COLLECTION.namespace}/${COLLECTION.actions.GET_COLLECTION}`,
      this.$route.params.id
    )
    this.updatedCollection = Object.assign({}, this.collectionData)
  }
}
</script>
