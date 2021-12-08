<template>
  <q-page padding>
    <div class="flex justify-between align-center q-mt-md q-mb-xl">
      <q-breadcrumbs class="align-center q-pa-sm" style="font-size: 14px">
        <template v-slot:separator>
          <q-icon size="24px" name="chevron_right" />
        </template>
        <q-breadcrumbs-el to="/" label="Adopisoft Billing Machine" />
        <q-breadcrumbs-el label="Collections" to="/collections" />
        <q-breadcrumbs-el label="Create" />
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
                <q-select
                  class="col col-xs-12 col-md-12"
                  v-model="newCollection.collected_by"
                  :options="collectors"
                  option-value="name"
                  option-label="name"
                  emit-value
                  map-options
                  label="Collected By"
                  options-dense
                  dense
                  outlined
                  :loading="fetchingUsers"
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
                  outlined
                  dense
                  v-model="newCollection.collected_at"
                  mask="date"
                  :rules="[
                    (val) => validator.required(val, 'date collected'),
                    (val) => validator.date(val, 'date collected')
                  ]"
                >
                  <template v-slot:append>
                    <q-icon name="event" class="cursor-pointer">
                      <q-popup-proxy
                        ref="qDateProxy"
                        cover
                        transition-show="scale"
                        transition-hide="scale"
                      >
                        <q-date
                          v-model="newCollection.collected_at"
                          :options="rangeOptionsFn"
                          :navigation-min-year-month="
                            getNavigationMinYearMonth()
                          "
                          :navigation-max-year-month="
                            getNavigationMaxYearMonth()
                          "
                        >
                          <div class="row items-center justify-end">
                            <q-btn
                              v-close-popup
                              label="Close"
                              color="primary"
                              flat
                            />
                          </div>
                        </q-date>
                      </q-popup-proxy>
                    </q-icon>
                  </template>
                </q-input>
              </div>
            </div>
            <div class="col col-xs-12 col-md-6 q-px-md">
              <q-file
                label="Files"
                multiple
                dense
                outlined
                accept="image/*"
                v-model="newCollection.images"
                :rules="[(val) => validator.required(val, 'attachment')]"
              >
                <template v-slot:prepend>
                  <q-icon name="attach_file" />
                </template>
              </q-file>
              <div v-if="newCollection.images.length">
                <div
                  v-for="(image, i) in newCollection.images"
                  :key="i"
                  class="row inline"
                >
                  <q-img
                    class="q-ma-md"
                    :src="getFileUrl(image)"
                    spinner-color="white"
                    style="height: 140px; max-width: 150px"
                    @click="openImage(image)"
                  />
                  <q-btn size="sm" color="negative" icon="delete_outline" label="Remove" @click="removeImage(i)" />
                </div>
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
import { resetErrorValues, setErrorValues } from 'src/util/validation'
import { formatDate } from 'src/util/date'
import { date } from 'quasar'
import USER from 'src/store/types/users'

export default {
  components: { EmptyState },
  name: 'Create Collection',
  data () {
    return {
      newCollection: {
        unit_id: '',
        collected_by: '',
        total: 0,
        collected_at: formatDate(new Date()),
        images: []
      },
      selectedUnit: null,
      validator: Validation,
      hasError: CollectionErrors,
      openImageModal: false,
      selectedImage: {
        url: '',
        name: ''
      },
      rangeOptions: [
        formatDate(
          date.subtractFromDate(new Date(), {
            days: 7
          })
        ),
        formatDate(new Date())
      ]
    }
  },
  async mounted () {
    this.$store.commit('layout/SET_HEADER', 'Collections')
    resetErrorValues(this.hasError)
    this.$store.dispatch(`${UNIT.namespace}/${UNIT.actions.GET_UNITS}`)
    this.$store.dispatch(
      `${USER.namespace}/${USER.actions.GET_USERS_COLLECTOR}`
    )
  },
  methods: {
    async createCollection () {
      resetErrorValues(this.hasError)
      const validated = await this.$refs.collectionForm.validate()
      if (validated) {
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
            setErrorValues(this.hasError, errors)
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
    },
    rangeOptionsFn (date) {
      return date >= this.rangeOptions[0] && date <= this.rangeOptions[1]
    },
    getNavigationMinYearMonth () {
      return this.rangeOptions[0].substring(
        0,
        this.rangeOptions[0].lastIndexOf('/')
      )
    },
    getNavigationMaxYearMonth () {
      return this.rangeOptions[1].substring(
        0,
        this.rangeOptions[1].lastIndexOf('/')
      )
    },
    removeImage (index) {
      this.newCollection.images.splice(index, 1)
    }
  },
  computed: {
    ...mapGetters({
      units: `${UNIT.namespace}/${UNIT.getters.GET_UNITS}`,
      collectionLoading: `${COLLECTION.namespace}/${COLLECTION.getters.GET_LOADING}`,
      unitLoading: `${UNIT.namespace}/${UNIT.getters.GET_LOADING}`,
      collectors: `${USER.namespace}/${USER.getters.GET_USERS}`,
      fetchingUsers: `${USER.namespace}/${USER.getters.GET_LOADING}`
    })
  }
}
</script>
