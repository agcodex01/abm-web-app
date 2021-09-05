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
        class="col"
        filled
        v-model="billerFilter.type"
        :options="types"
        label="Types"
        @update:model-value="updateFilter"
        options-dense
        map-options
        emit-value
        dense
      />
      <q-select
        class="col"
        filled
        v-model="billerFilter.createdAt"
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
      title="Billers"
      no-data-label="There is no remits as of now!"
      no-results-label="The filter didn't find any remits"
      class="q-mt-lg"
      selection="multiple"
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
        <q-inner-loading :showing="loading" color="primary">
          <q-spinner color="primary" size="2rem" :thickness="5" />
          <div class="text-subtitle2 q-mt-md">Fetching data...</div>
        </q-inner-loading>
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
      <template v-slot:no-data="{ message }">
        <div class="full-width text-subtitle1 text-center text-primary">
          {{ message }}
        </div>
      </template>
    </q-table>
  </q-page>
</template>
<script>
import BILLER, { BILLER_TYPE } from 'src/store/types/billers'
import { mapGetters } from 'vuex'
import GeneralTypes from 'src/store/types/general'
import { CREATED_AT, getCreateAtOptions } from 'src/util/transaction'
export default {
  name: 'Billers',
  data: () => ({
    filter: '',
    createdAtOptions: getCreateAtOptions(),
    billerFilter: {
      type: BILLER_TYPE.ALL.value,
      createdAt: CREATED_AT.TODAY.value
    }
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
      loading: `${GeneralTypes.namespace}/${GeneralTypes.getters.GET_LOADING}`
    })
  },
  methods: {
    async updateFilter () {
      await this.$store.dispatch(
        `${BILLER.namespace}/${BILLER.actions.GET_BILLERS}`,
        this.billerFilter
      )
    }
  }
}
</script>
