<template>
  <q-page padding>
    <div class="q-mt-md q-mb-xl">
      <q-breadcrumbs class="align-center q-pa-sm" style="font-size: 14px">
        <template v-slot:separator>
          <q-icon size="24px" name="chevron_right" />
        </template>
        <q-breadcrumbs-el to="/" label="Adopisoft Billing Machine" />
        <q-breadcrumbs-el to="/billers" label="Billers" />
        <q-breadcrumbs-el :label="biller.name" />
      </q-breadcrumbs>
    </div>

    <q-card>
      <q-card-section class="q-py-lg">
        <div class="row">
          <div class="col-6">
            <div class="text-subtitle2 q-mb-md">Info</div>
            <q-form ref="billerForm">
              <q-input
                v-model="biller.name"
                type="text"
                label="Name"
                outlined
                dense
                :error="hasError.name.error"
                :error-message="hasError.name.message"
                :rules="[(val) => validator.required(val, 'name')]"
              />
              <q-select
                filled
                v-model="biller.type"
                :options="types"
                label="Type"
                options-dense
                emit-value
                dense
              />
            </q-form>
          </div>
          <div class="col-6 q-px-lg">
            <div class="text-subtitle2 q-mb-md">Accounts</div>
            <q-table
              flat
              :rows="accounts"
              :columns="accountTableHeader"
              row-key="name"
              v-if="accounts.length"
            />
            <empty-state v-else/>
          </div>
        </div>
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
        :loading="loading"
        :style="{ width: loading ? '150px' : '' }"
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
import BILLER, { BILLER_TYPE } from 'src/store/types/billers'
import { mapActions, mapGetters } from 'vuex'
import Validation from 'src/util/rules'
import AppConstant from 'src/constant/app'
import ACCOUNT from 'src/store/types/account'
import EmptyState from 'src/components/EmptyState.vue'
export default {
  components: { EmptyState },
  name: 'UpdateBiller',
  data: () => ({
    biller: {
      name: '',
      type: BILLER_TYPE.WATER.value
    },
    types: [BILLER_TYPE.WATER, BILLER_TYPE.INTERNET, BILLER_TYPE.ELECTRICITY],
    validator: Validation,
    loading: false,
    hasError: {
      name: {
        message: null,
        error: false
      }
    }
  }),
  methods: {
    ...mapActions({
      updateBiller: `${BILLER.namespace}/${BILLER.actions.UPDATE_BILLER}`
    }),
    async onUpdate () {
      const validated = await this.$refs.billerForm.validate()
      if (validated) {
        this.loading = true
        this.updateBiller({ id: this.biller.id, biller: this.biller })
          .then((biller) => {
            this.$q.notify(
              AppConstant.SUCCESS_MSG(
                `Successfully updated ${biller.name} biller.`
              )
            )
          })
          .catch((errors) => {
            if ('name' in errors) {
              this.hasError.name.error = true
              this.hasError.name.message = errors.name[0]
            }
          })
          .finally(() => {
            this.loading = false
          })
      }
    }
  },
  computed: {
    ...mapGetters({
      billerData: `${BILLER.namespace}/${BILLER.getters.GET_BILLER}`,
      accounts: `${ACCOUNT.namespace}/${ACCOUNT.getters.GET_ACCOUNTS}`,
      accountTableHeader: `${ACCOUNT.namespace}/${ACCOUNT.getters.GET_BILLER_ACCOUNT_TABLE_HEADER}`
    })
  },
  async mounted () {
    this.$store.commit('layout/SET_HEADER', 'Billers')
    await this.$store.dispatch(
      `${BILLER.namespace}/${BILLER.actions.GET_BILLER}`,
      this.$route.params.id
    )
    this.biller = Object.assign({}, this.billerData)
  }
}
</script>
