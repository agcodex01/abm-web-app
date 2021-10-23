<template>
  <q-page padding>
    <div class="flex justify-between align-center q-mt-md q-mb-xl">
      <q-breadcrumbs class="align-center q-pa-sm" style="font-size: 14px">
        <template v-slot:separator>
          <q-icon size="24px" name="chevron_right" />
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
        <q-form ref="collectionForm">
          <div class="text-subtitle1 q-ma-sm">Information</div>
          <div class="row">
            <div class="col-md-6 q-px-md">
              <div class="row q-col-gutter-sm">
                <q-select
                  class="col col-xs-12 col-md-12"
                  v-model="newCollection.unit_id"
                  :options="units"
                  option-value="id"
                  option-label="name"
                  emit-value
                  map-options
                  label="Unit"
                  options-dense
                  dense
                  outlined
                  :loading="unitLoading"
                  :error="hasError.unit_id.error"
                  :error-message="hasError.unit_id.message"
                  :rules="[(val) => validator.required(val, 'unit')]"
                />
                <q-input
                  class="col col-xs-12 col-md-12"
                  v-model="newCollection.collected_by"
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
                  class="col col-xs-12 col-md-12"
                  v-model="newCollection.collected_at"
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
              <q-file
                label="Files"
                multiple
                dense
                outlined
                v-model="newCollection.images"
              >
                <template v-slot:prepend>
                  <q-icon name="attach_file" />
                </template>
              </q-file>
              <div v-if="newCollection.images.length">
                <q-img
                  class="q-ma-md"
                  v-for="image in newCollection.images"
                  :key="image"
                  :src="getFileUrl(image)"
                  spinner-color="white"
                  style="height: 140px; max-width: 150px"
                  @click="openImage(image)"
                />
              </div>
              <empty-state v-else message="No files attached." />
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
        :loading="collectionLoading"
        :style="{ width: collectionLoading ? '150px' : '' }"
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
import { mapGetters } from 'vuex'
import EmptyState from 'src/components/EmptyState.vue'
import CollectionErrors from 'src/store/modules/collection/errors'

export default {
  components: { EmptyState },
  name: 'Create Collection',
  data () {
    return {
      newCollection: {
        unit_id: '',
        collected_by: '',
        total: 0,
        collected_at: '',
        images: []
      },
      selectedUnit: null,
      validator: Validation,
      hasError: CollectionErrors,
      openImageModal: false,
      selectedImage: {
        url: '',
        name: ''
      }
    }
  },
  async mounted () {
    this.$store.commit('layout/SET_HEADER', 'Collections')
    await this.$store.dispatch(`${UNIT.namespace}/${UNIT.actions.GET_UNITS}`)
  },
  methods: {
    async createCollection () {
      const validated = await this.$refs.collectionForm.validate()
      if (validated) {
        // this.newCollection.unit_id = this.selectedUnit.value
        await this.$store
          .dispatch(
            `${COLLECTION.namespace}/${COLLECTION.actions.CREATE_COLLECTION}`,
            this.newCollection
          )
          .then((collection) => {
            this.$q.notify(
              AppConstant.SUCCESS_MSG(
                `Successfully created a collection from  ${this.newCollection.unit_id}.`
              )
            )
            this.$router.push({
              name: 'update_collection',
              params: { id: collection.id }
            })
          })
          .catch((errors) => {
            Object.keys(this.hasError).forEach(key => {
              if (key in errors) {
                this.hasError[key].error = true
                this.hasError[key].message = errors[key][0]
              }
            })
          })
      }
    },
    getFileUrl (image) {
      return URL.createObjectURL(image)
    },
    openImage (image) {
      this.selectedImage.url = this.getFileUrl(image)
      this.selectedImage.name = image.name
      this.openImageModal = true
    }
  },
  computed: {
    ...mapGetters({
      units: `${UNIT.namespace}/${UNIT.getters.GET_UNITS}`,
      collectionLoading: `${COLLECTION.namespace}/${COLLECTION.getters.GET_LOADING}`,
      unitLoading: `${UNIT.namespace}/${UNIT.getters.GET_LOADING}`
    })
  }
}
</script>
