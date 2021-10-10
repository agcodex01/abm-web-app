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
        <q-form ref="collectionForm">
          <div class="row">
            <div class="col col-xs-12 col-md-6 q-px-md">
              <div class="row q-col-gutter-sm">
                <div class="col col-xs-12 col-md-12 col-12 text-subtitle2 q-ma-sm">Information</div>
                <q-select
                  class="col col-xs-12 col-md-12"
                  v-model="updatedCollection.unit_id"
                  :options="units"
                  label="Unit"
                  options-dense
                  emit-value
                  dense
                  outlined
                  :loading="unitLoading"
                  :error="hasError.unit_id.error"
                  :error-message="hasError.unit_id.message"
                  :rules="[(val) => validator.required(val, 'unit')]"
                />
                <q-input
                  class="ccol col-xs-12 col-md-12"
                  v-model="updatedCollection.collected_by"
                  type="text"
                  label="Collector"
                  outlined
                  dense
                  :error="hasError.collected_by.error"
                  :error-message="hasError.collected_by.message"
                  :rules="[(val) => validator.required(val, 'collector')]"
                />
                <q-input
                  class="col col-xs-12 col-md-12"
                  v-model="updatedCollection.total"
                  type="number"
                  label="Total"
                  outlined
                  dense
                  :error="hasError.total.error"
                  :error-message="hasError.total.message"
                  :rules="[(val) => validator.required(val, 'total')]"
                />
                <q-input
                  class="col col-xs-12 col-md-12"
                  v-model="updatedCollection.collected_at"
                  type="date"
                  outlined
                  dense
                  :error="hasError.collected_at.error"
                  :error-message="hasError.collected_at.message"
                  :rules="[(val) => validator.required(val, 'date collected')]"
                />
              </div>
            </div>

            <div class="col col-xs-12 col-md-6 q-px-md">
               <div class="col col-xs-12 col-md-6 q-px-md text-subtitle2 q-ma-sm">Files</div>
              <div v-if="updatedCollection.images.length">
                <q-img
                    class="q-ma-md"
                    v-for="image in updatedCollection.images"
                    :key="image"
                    :src="api + image.url"
                    spinner-color="white"
                    style="height: 140px; max-width: 150px"
                    @click="openImage(image)"
                  />
                </div>
                 <empty-state v-else message="No files attached."/>
              </div>
          </div>
        </q-form>
      </q-card-section>
    </q-card>
    <q-dialog v-model="openImageModal">
      <q-card style="width: 450px" class="q-py-lg">
        <q-card-section> <b>Name:</b> {{ selectedImage.name }} </q-card-section>
        <q-card-section class="text-center">
          <q-img
            :src="selectedImage.url"
            spinner-color="primary"
            style="width: 100%"
            spinner-size="82px"
          />
        </q-card-section>
        <q-card-actions vertical align="center">
          <q-btn
            class="full-width"
            color="primary"
            label="Close"
            v-close-popup
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
      <q-btn
        size="sm"
        color="primary"
        padding="sm lg"
        label="Save"
        :loading="collectionLoading && !!updatedCollection.unit_id"
        :style="{ width: collectionLoading && !!updatedCollection.unit_id ? '150px' : '' }"
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
import UNIT from 'src/store/types/units'
import Validation from 'src/util/rules'
import AppConstant from 'src/constant/app'
import { API_BASE_URL } from 'src/boot/axios'
import EmptyState from 'src/components/EmptyState.vue'
export default {
  components: { EmptyState },
  name: 'Update Collection',
  data () {
    return {
      id: this.$route.params.id,
      updatedCollection: {
        unit_id: null,
        collected_by: '',
        total: 0,
        collected_at: '',
        images: []
      },
      api: API_BASE_URL,
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
      },
      openImageModal: false,
      selectedImage: {
        url: '',
        name: ''
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
        this.updateCollection({
          id: this.updatedCollection.id,
          collection: this.updatedCollection
        })
          .then((collection) => {
            this.$router.push({ name: 'collections' })
            this.$q.notify(
              AppConstant.SUCCESS_MSG(
                `Successfully updated ${this.updatedCollection.id} collection.`
              )
            )
          })
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
      }
    },
    getFileUrl (image) {
      return URL.createObjectURL(image)
    },
    openImage (image) {
      this.selectedImage.url = this.api + image.url
      this.selectedImage.name = image.name
      this.openImageModal = true
    }
  },
  computed: {
    ...mapGetters({
      collectionData: `${COLLECTION.namespace}/${COLLECTION.getters.GET_COLLECTION}`,
      collectionLoading: `${COLLECTION.namespace}/${COLLECTION.getters.GET_LOADING}`,
      unitLoading: `${UNIT.namespace}/${UNIT.getters.GET_LOADING}`
    })
  },
  async mounted () {
    this.$store.commit('layout/SET_HEADER', 'Collections')
    await this.$store
      .dispatch(`${UNIT.namespace}/${UNIT.actions.GET_UNITS}`)
      .then((response) => {
        this.units = response
      })
    await this.$store.dispatch(
      `${COLLECTION.namespace}/${COLLECTION.actions.GET_COLLECTION}`,
      this.$route.params.id
    )
    this.updatedCollection = Object.assign({}, this.collectionData)
  }
}
</script>
