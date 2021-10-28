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
        <q-breadcrumbs-el label="Remits"/>
      </q-breadcrumbs>
      <q-btn size="sm" outline  color="primary" icon-right="archive"  label="Dowload csv Report"/>
    </div>

    <div class="row q-col-gutter-sm">
      <q-select
        class="col-3"
        filled
        v-model="remitFilter.createdAt"
        :options="createdAtOptions"
        label="Created At"
        @update:model-value="updateFilter"
        options-dense
        emit-value
        map-options
        dense
      />
    </div>

    <q-table
      title="Remits"
      no-data-label="There is no remits as of now!"
      no-results-label="The filter didn't find any remits"
      loading-label="Fetching remits..."
      class="q-mt-lg"
      row-key="id"
      :rows="remits"
      :columns="tableHeader"
      :filter="filter"
      :loading="loading"
    >
      <template v-slot:loading>
       <table-loader v-if="loading"/>
      </template>
      <template v-slot:top-right>
        <q-input
          outlined
          dense
          debounce="300"
          v-model="filter"
          placeholder="Search"
          clearable
        >
          <template v-slot:append>
            <q-icon name="search" />
          </template>
        </q-input>
      </template>
      <template v-slot:body-cell-id="props">
        <q-td :props="props">
          <q-btn
            size="sm"
            no-caps
            style="font-size:12px"
            text-color="primary"
            class="link"
            type="a"
            flat
            :label="props.value"
            :to="{name: 'view_remit', params: { id : props.value}}"
          />
        </q-td>
      </template>
      <template v-slot:no-data="{ message }">
        <no-data :message="message"/>
      </template>
    </q-table>
  </q-page>
</template>

<script>
import { mapGetters } from 'vuex'
import { CREATED_AT, getCreateAtOptions } from 'util/transaction'
import REMIT from 'src/store/types/remits'
import TableLoader from 'src/components/loaders/TableLoader.vue'
import NoData from 'src/components/loaders/NoData.vue'

export default {
  components: { TableLoader, NoData },
  name: 'Remits',
  data () {
    return {
      filter: '',
      createdAtOptions: getCreateAtOptions(),
      remitFilter: {
        createdAt: CREATED_AT.TODAY.value
      }
    }
  },
  async mounted () {
    this.$store.commit('layout/SET_HEADER', 'Remits')
    await this.$store.dispatch(`${REMIT.namespace}/${REMIT.actions.GET_REMITS}`, this.remitFilter)
  },
  computed: {
    ...mapGetters({
      tableHeader: `${REMIT.namespace}/${REMIT.getters.GET_TABLE_HEADER}`,
      remits: `${REMIT.namespace}/${REMIT.getters.GET_REMITS}`,
      loading: `${REMIT.namespace}/${REMIT.getters.GET_LOADING}`
    })
  },
  methods: {
    async updateFilter () {
      this.$store.dispatch(`${REMIT.namespace}/${REMIT.actions.GET_REMITS}`, this.remitFilter)
    }
  }
}
</script>
