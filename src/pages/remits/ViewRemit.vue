<template>
  <q-page padding>
    <div class="q-mt-md q-mb-xl">
      <q-breadcrumbs class="align-center q-pa-sm" style="font-size: 14px">
        <template v-slot:separator>
          <q-icon
            size="24px"
            name="chevron_right"
          />
        </template>
        <q-breadcrumbs-el to="/" label="Adopisoft Billing Machine" />
        <q-breadcrumbs-el to="/remits" label="Remits"/>
        <q-breadcrumbs-el :label="$route.params.id"/>
      </q-breadcrumbs>
    </div>
       <q-card class="q-mt-lg q-pa-sm">
        <q-card-section class="flex justify-between align-center">
          <div class="text-h6">Remit Report</div>
          <q-btn size="sm" outline  color="primary" :loading="downloadingReport" icon-right="cloud_download" label="Download" @click="downloadReport(remit.id)"/>
        </q-card-section>
        <q-card-section class="q-py-sm">
           <div class="text-body">Remitted by  {{ remit?.remitted_by }} on  {{ date.formatDate(remit?.created_at , 'ddd MMM. D , YYYY')}} </div>
        </q-card-section>
        <q-card-section>
          <q-table
            title="Transactions"
            title-class="text-subtitle2"
            :rows="transactions"
            :columns="transactionPreviewHeader"
            row-key="id"
            flat
          >
          <template v-slot:top-right>
            <div class="text-subtitle2">Total: P <span>  {{ remit?.total }}</span> </div>
          </template>
          <template v-slot:body-cell-type="props">
            <q-td :props="props">
              <q-badge
                :color="typeColor(props.value)"
                :label="props.value"
              />
            </q-td>
          </template>
           <template v-slot:body-cell-status="props">
            <q-td :props="props">
              <q-badge
                :color="statusColor(props.value)"
                :label="props.value"
              />
            </q-td>
          </template>
          </q-table>
        </q-card-section>
      </q-card>
    <q-footer class="bg-white q-py-sm q-px-md" reveal bordered>
      <q-btn size="sm" icon="chevron_left" align="center" unelevated outline padding="sm md" color="primary" @click="$router.back">
        Back
      </q-btn>
    </q-footer>
  </q-page>
</template>
<script>
import { mapActions, mapGetters } from 'vuex'
import TRANSACTION from 'src/store/types/transactions'
import GeneralTypes from 'src/store/types/general'
import { getCreateAtOptions } from 'util/transaction'
import REMIT from 'src/store/types/remits'
import { date } from 'quasar'

export default {
  name: 'View Remit',
  data () {
    return {
      createdAtOptions: getCreateAtOptions(),
      date: date
    }
  },
  async mounted () {
    this.$store.commit('layout/SET_HEADER', 'Remits')
    await this.$store.dispatch(`${REMIT.namespace}/${REMIT.actions.GET_REMIT}`, this.$route.params.id)
    await this.$store.dispatch(`${REMIT.namespace}/${REMIT.actions.GET_REMIT_TRANSACTIONS}`, this.$route.params.id)
  },
  computed: {
    ...mapGetters({
      transactions: `${REMIT.namespace}/${REMIT.getters.GET_REMIT_TRANSACTIONS}`,
      statusColor: `${TRANSACTION.namespace}/${TRANSACTION.getters.GET_STATUS_COLOR}`,
      typeColor: `${TRANSACTION.namespace}/${TRANSACTION.getters.GET_TYPE_COLOR}`,
      transactionPreviewHeader: `${REMIT.namespace}/${REMIT.getters.GET_REMITS_TRANSACTION_PREVIEW_HEADER}`,
      loading: `${GeneralTypes.namespace}/${GeneralTypes.getters.GET_LOADING}`,
      remit: `${REMIT.namespace}/${REMIT.getters.GET_REMIT}`,
      downloadingReport: `${REMIT.namespace}/${REMIT.getters.DOWNLOADING_REPORT}`
    })
  },
  methods: {
    ...mapActions({
      downloadReport: `${REMIT.namespace}/${REMIT.actions.DOWNLOAD_REMIT_REPORT}`
    }),
    async updateFilter () {
      await this.$store.dispatch(`${TRANSACTION.namespace}/${TRANSACTION.actions.GET_TRANSACTIONS}`, this.transactionFilter)
    }
  }
}
</script>
