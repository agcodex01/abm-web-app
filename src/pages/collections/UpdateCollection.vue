<template>
  <q-page padding>
    <div class="q-mt-md q-mb-xl">
      <q-breadcrumbs class="align-center q-pa-sm" style="font-size: 14px">
        <template v-slot:separator>
          <q-icon size="24px" name="chevron_right" />
        </template>
        <q-breadcrumbs-el to="/" label="Adopisoft Billing Machine" />
        <q-breadcrumbs-el to="/collections" label="Collections" />
        <q-breadcrumbs-el label="Details" />
      </q-breadcrumbs>
    </div>

    <q-card>
      <q-card-section>
        <div class="text-h6">Collection Details</div>
      </q-card-section>
      <q-card-section>
        <q-form ref="collectionForm">
          <div class="row">
            <div class="col col-xs-12 col-md-6 q-px-md">
              <div class="row q-col-gutter-sm">
                <div class="col col-xs-12 col-md-12 col-12 text-subtitle2 q-mb-md">Details</div>
                <!-- <q-select
                  class="col col-xs-12 col-md-12"
                  v-model="updatedCollection.unit_id"
                  :options="units"
                  label="Unit"
                  option-label="name"
                  option-value="id"
                  options-dense
                  emit-value
                  map-options
                  dense
                  outlined
                  :loading="unitLoading"
                  :error="hasError.unit_id.error"
                  :error-message="hasError.unit_id.message"
                  :rules="[(val) => validator.required(val, 'unit')]"
                />
                <q-select
                  class="col col-xs-12 col-md-12"
                  v-model="updatedCollection.collected_by"
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
                  v-model="updatedCollection.total"
                  type="number"
                  label="Total"
                  outlined
                  dense
                  :error="hasError.total.error"
                  :error-message="hasError.total.message"
                  :rules="[(val) => validator.required(val, 'total')]"
                />
                 <q-input class="col col-xs-12 col-md-12"
                  outlined
                  dense
                  v-model="updatedCollection.collected_at"
                  mask="date"
                  :rules="[
                    (val) => validator.required(val, 'date collected'),
                    (val) => validator.date(val, 'date collected')
                  ]">
                  <template v-slot:append>
                    <q-icon name="event" class="cursor-pointer">
                      <q-popup-proxy ref="qDateProxy" cover transition-show="scale" transition-hide="scale">
                        <q-date
                          v-model="updatedCollection.collected_at"
                          :options="rangeOptionsFn"
                          :navigation-min-year-month="getNavigationMinYearMonth()"
                          :navigation-max-year-month="getNavigationMaxYearMonth()"
                        >
                          <div class="row items-center justify-end">
                            <q-btn v-close-popup label="Close" color="primary" flat />
                          </div>
                        </q-date>
                      </q-popup-proxy>
                    </q-icon>
                  </template>
                </q-input> -->
                <q-list bordered separator class="full-width">
                  <q-item>
                    <q-item-section>Unit</q-item-section>
                    <q-item-section side v-text="updatedCollection?.unit?.name"></q-item-section>
                  </q-item>
                  <q-item>
                    <q-item-section>Collected By</q-item-section>
                    <q-item-section side v-text="updatedCollection.collected_by"/>
                  </q-item>
                  <q-item>
                    <q-item-section>Total</q-item-section>
                    <q-item-section side v-text="updatedCollection.total"/>
                  </q-item>
                  <q-item>
                    <q-item-section>Collected At</q-item-section>
                    <q-item-section side v-text="updatedCollection.collected_at"/>
                  </q-item>
                </q-list>
              </div>
            </div>

            <div class="col col-xs-12 col-md-6 q-px-md">
               <div class="col col-xs-12 col-md-6 q-px-md text-subtitle2 q-ma-sm">Files</div>
              <div v-if="updatedCollection.images.length">
                <q-img
                    class="q-ma-md"
                    v-for="image in updatedCollection.images"
                    :key="image"
                    :src="image.url"
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
import CollectionErrors from 'src/store/modules/collection/errors'
import { resetErrorValues, setErrorValues } from 'src/util/validation'
import { formatDate } from 'src/util/date'
import { date } from 'quasar'
import USER from 'src/store/types/users'

export default {
  components: { EmptyState },
  name: 'Update Collection',
  data () {
    return {
      id: this.$route.params.id,
      updatedCollection: {
        name: null,
        collected_by: '',
        total: 0,
        collected_at: formatDate(new Date()),
        images: []
      },
      api: API_BASE_URL,
      validator: Validation,
      loading: false,
      hasError: CollectionErrors,
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
      resetErrorValues(this.hasError)
      const validated = await this.$refs.collectionForm.validate()
      if (validated) {
        this.updateCollection({
          id: this.updatedCollection.id,
          collection: this.updatedCollection
        })
          .then((collection) => {
            this.$q.notify(
              AppConstant.SUCCESS_MSG(
                `Successfully updated ${this.updatedCollection.id} collection.`
              )
            )
            this.$router.push({
              name: 'collections'
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
      this.selectedImage.url = image.url
      this.selectedImage.name = image.name
      this.openImageModal = true
    },
    rangeOptionsFn (date) {
      return date >= this.rangeOptions[0] && date <= this.rangeOptions[1]
    },
    getNavigationMinYearMonth () {
      return this.rangeOptions[0].substring(0, this.rangeOptions[0].lastIndexOf('/'))
    },
    getNavigationMaxYearMonth () {
      return this.rangeOptions[1].substring(0, this.rangeOptions[1].lastIndexOf('/'))
    }
  },
  computed: {
    ...mapGetters({
      collectionData: `${COLLECTION.namespace}/${COLLECTION.getters.GET_COLLECTION}`,
      collectionLoading: `${COLLECTION.namespace}/${COLLECTION.getters.GET_LOADING}`,
      unitLoading: `${UNIT.namespace}/${UNIT.getters.GET_LOADING}`,
      units: `${UNIT.namespace}/${UNIT.getters.GET_UNITS}`,
      collectors: `${USER.namespace}/${USER.getters.GET_USERS}`,
      fetchingUsers: `${USER.namespace}/${USER.getters.GET_LOADING}`
    }),
    rangeOptions () {
      return [formatDate(date.subtractFromDate(new Date(this.updatedCollection.collected_at), {
        days: 7
      })),
      formatDate(new Date(this.updatedCollection.collected_at))
      ]
    }
  },
  async mounted () {
    this.$store.commit('layout/SET_HEADER', 'Collections')
    resetErrorValues(this.hasError)
    this.$store.dispatch(`${UNIT.namespace}/${UNIT.actions.GET_UNITS}`)
    this.$store.dispatch(`${USER.namespace}/${USER.actions.GET_USERS_COLLECTOR}`)
    await this.$store.dispatch(
      `${COLLECTION.namespace}/${COLLECTION.actions.GET_COLLECTION}`,
      this.$route.params.id
    )
    this.updatedCollection = Object.assign({}, this.collectionData)
  }
}
</script>
