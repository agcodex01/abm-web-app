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
        <q-breadcrumbs-el label="Units"/>
      </q-breadcrumbs>
      <q-btn
        size="sm"
        outline
        color="primary"
        label="Add Unit"
        icon-right="add"
        @click="$router.push({ name: 'create_unit' })"
      />
    </div>
    <div class="row q-col-gutter-sm">
      <q-select
        class="col-3"
        filled
        v-model="unitFilter.status"
        :options="statuses"
        label="Status"
        @update:model-value="updateFilter"
        clearable
        options-dense
        option-label="display"
        emit-value
        dense
      />
    </div>
    <q-table
      title="Units"
      no-data-label="There is no Units as of now!"
      no-results-label="The filter didn't find any Units"
      loading-label="Fetching units..."
      class="q-mt-lg"
      row-key="id"
      :rows="unitsData"
      :columns="tableHeader"
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
            :to="{ name: 'update_unit', params: { id: props.value } }"
          />
        </q-td>
      </template>
      <template v-slot:body-cell-status="props">
        <q-td :props="props">
          <q-chip
            style="font-size: 12px"
            outline
            text-color="white"
            dense
            :color="props.value ? 'negative' : 'positive'"
            :label="props.value ? 'disabled' : 'enable'"
          />
        </q-td>
      </template>
      <template v-slot:loading>
       <table-loader v-if="loading"/>
      </template>
      <template v-slot:no-data="{ message }">
        <no-data :message="message"/>
      </template>
    </q-table>
  </q-page>
</template>

<script>
import { mapGetters } from 'vuex'
import UNIT from 'src/store/types/units'
import AuthTypes from 'src/store/types/auth'
import TableLoader from 'src/components/loaders/TableLoader.vue'
import NoData from 'src/components/loaders/NoData.vue'
import { UNIT_STATUS } from 'util/unit'
export default {
  name: 'Transactions',
  components: { TableLoader, NoData },
  data: () => ({
    filter: '',
    unitFilter: {
      status: null
    },
    statuses: Object.values(UNIT_STATUS)
  }),
  async mounted () {
    this.$store.commit('layout/SET_HEADER', 'Units')
    await this.$store.dispatch(`${UNIT.namespace}/${UNIT.actions.GET_UNITS}`, this.unitFilter)
  },
  computed: {
    ...mapGetters({
      user: `${AuthTypes.namespace}/${AuthTypes.getters.GET_USER}`,
      units: `${UNIT.namespace}/${UNIT.getters.GET_UNITS}`,
      tableHeader: `${UNIT.namespace}/${UNIT.getters.GET_UNITS_TABLE_HEADER}`,
      loading: `${UNIT.namespace}/${UNIT.getters.GET_LOADING}`
    }),
    unitsData () {
      return this.loading ? [] : this.units
    }
  },
  methods: {
    disable (unit) {
      return unit.collections_count > 0 || unit.transactions_count > 0
    },
    async updateFilter () {
      await this.$store.dispatch(`${UNIT.namespace}/${UNIT.actions.GET_UNITS}`, this.unitFilter)
    }
  }
}
</script>
