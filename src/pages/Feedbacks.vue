<template>
  <div class="q-pa-md">
    <div class="flex justify-between align-center q-mt-md q-mb-xl">
      <q-breadcrumbs class="align-center q-pa-sm" style="font-size: 14px">
        <template v-slot:separator>
          <q-icon size="24px" name="chevron_right" />
        </template>
        <q-breadcrumbs-el to="/" label="Adopisoft Billing Machine" />
        <q-breadcrumbs-el label="Feedbacks" />
      </q-breadcrumbs>
    </div>
    <q-table
      title="Feedbacks"
      no-data-label="There is no feedbacks as of now!"
      no-results-label="The filter didn't find any feedbacks"
      loading-label="Fetching feedbacks..."
      :rows="feedbacks"
      :columns="tableConfig"
      row-key="id"
      :loading="loading"
    >
      <template v-slot:loading>
        <table-loader v-if="loading" />
      </template>
      <template v-slot:body="props">
        <q-tr :props="props">
          <q-td auto-width>
            <q-btn
              size="sm"
              color="accent"
              round
              dense
              @click="props.expand = !props.expand"
              :icon="props.expand ? 'remove' : 'add'"
            >
            </q-btn>
            {{ props.value }}
          </q-td>
          <q-td key="unit" :props="props">
            {{ props.row.unit.name }}
          </q-td>
          <q-td key="biller" :props="props">
            {{ props.row.account.biller.name }}
          </q-td>
          <q-td key="service_no" :props="props">
            {{ props.row.account.service_number }}
          </q-td>
          <q-td key="created_at" :props="props">
            {{ date.formatDate(props.row.created_at, 'ddd MMM. D , YYYY') }}
          </q-td>
        </q-tr>
        <q-tr v-show="props.expand" :props="props">
          <q-td colspan="100%">
            <div class="text-left">
              Feedback Message: {{ props.row.message }}
            </div>
          </q-td>
        </q-tr>
      </template>
      <template v-slot:no-data="{ message }">
        <no-data :message="message" />
      </template>
    </q-table>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import { date } from 'quasar'
import FEEDBACKS from 'src/store/types/feedbacks'
import TableLoader from 'src/components/loaders/TableLoader.vue'
import NoData from 'src/components/loaders/NoData.vue'
export default {
  name: 'Feedbacks',
  components: { TableLoader, NoData },
  data: () => ({
    date: date
  }),
  async mounted () {
    this.$store.commit('layout/SET_HEADER', 'Feedbacks')
    await this.$store.dispatch(
      `${FEEDBACKS.namespace}/${FEEDBACKS.actions.GET_FEEDBACKS}`
    )
  },
  computed: {
    ...mapGetters({
      feedbacks: `${FEEDBACKS.namespace}/${FEEDBACKS.getters.GET_FEEDBACKS}`,
      tableConfig: `${FEEDBACKS.namespace}/${FEEDBACKS.getters.GET_FEEDBACKS_TABLE_CONFIG}`,
      loading: `${FEEDBACKS.namespace}/${FEEDBACKS.getters.GET_LOADING}`
    })
  }
}
</script>
