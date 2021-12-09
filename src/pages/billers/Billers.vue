<template>
  <q-page padding>
    <div class="flex justify-between align-center q-mt-md q-mb-xl">
      <q-breadcrumbs class="align-center q-pa-sm" style="font-size: 14px">
        <template v-slot:separator>
          <q-icon size="24px" name="chevron_right" />
        </template>
        <q-breadcrumbs-el to="/" label="Adopisoft Billing Machine" />
        <q-breadcrumbs-el label="Billers" />
      </q-breadcrumbs>
      <q-btn
        size="sm"
        outline
        color="primary"
        label="Add new"
        icon-right="add"
        @click="$router.push({ name: 'create_biller' })"
      />
    </div>
    <div class="row q-col-gutter-sm">
      <q-select
        class="col-3"
        filled
        v-model="billerFilter.type"
        :options="types"
        label="Type"
        @update:model-value="updateFilter"
        clearable
        options-dense
        map-options
        emit-value
        dense
        :loading="typesLoading"
      />
    </div>
    <q-table
      title="Billers"
      no-data-label="There is no billers as of now!"
      no-results-label="The filter didn't find any billers"
      loading-label="Fetching billers..."
      class="q-mt-lg"
      row-key="id"
      :rows="billers"
      :columns="tableConfig"
      :filter="filter"
      :loading="loading"
    >
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
      <template v-slot:loading>
        <table-loader v-if="loading" />
      </template>
      <template v-slot:body-cell-id="props">
        <q-td :props="props">
          <q-btn
            size="sm"
            no-caps
            style="font-size: 12px"
            text-color="primary"
            class="link"
            type="a"
            flat
            :label="props.value"
            :to="{ name: 'update_biller', params: { id: props.value } }"
          />
        </q-td>
      </template>
      <template v-slot:body-cell-type="props">
        <q-td :props="props">
          <q-badge
            :color="typeColor(props.value)"
            :label="props.value"
          />
        </q-td>
      </template>
      <template v-slot:no-data="{ message }">
        <no-data :message="message" />
      </template>
    </q-table>
  </q-page>
</template>
<script>
import BILLER from 'src/store/types/billers'
import { mapGetters } from 'vuex'
import { getCreateAtOptions } from 'src/util/transaction'
import TRANSACTION from 'src/store/types/transactions'
import TableLoader from 'src/components/loaders/TableLoader.vue'
import NoData from 'src/components/loaders/NoData.vue'
export default {
  components: { TableLoader, NoData },
  name: 'Billers',
  data: () => ({
    filter: '',
    billerFilter: {
      type: null
    },
    createdAtOptions: getCreateAtOptions()
  }),
  async mounted () {
    this.$store.commit('layout/SET_HEADER', 'Billers')
    await this.$store.dispatch(
      `${BILLER.namespace}/${BILLER.actions.GET_BILLERS}`,
      this.billerFilter
    )
  },
  computed: {
    ...mapGetters({
      billers: `${BILLER.namespace}/${BILLER.getters.GET_BILLERS}`,
      tableConfig: `${BILLER.namespace}/${BILLER.getters.GET_BILLERS_TABLE_CONFIG}`,
      types: `${BILLER.namespace}/${BILLER.getters.GET_BILLER_TYPES}`,
      loading: `${BILLER.namespace}/${BILLER.getters.GET_LOADING}`,
      typeColor: `${TRANSACTION.namespace}/${TRANSACTION.getters.GET_TYPE_COLOR}`,
      typesLoading: `${BILLER.namespace}/${BILLER.getters.GET_TYPE_LOADING}`
    })
  },
  methods: {
    async updateFilter () {
      await this.$store.dispatch(`${BILLER.namespace}/${BILLER.actions.GET_BILLERS}`, this.billerFilter)
    }
  }
}
</script>
