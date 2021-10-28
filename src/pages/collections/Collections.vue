<template>
  <q-page padding>
    <div class="flex justify-between align-center q-mt-md q-mb-xl">
      <q-breadcrumbs class="align-center q-pa-sm" style="font-size: 14px">
        <template v-slot:separator>
          <q-icon size="24px" name="chevron_right" />
        </template>
        <q-breadcrumbs-el to="/" label="Adopisoft Billing Machine" />
        <q-breadcrumbs-el label="Collections" />
      </q-breadcrumbs>
      <q-btn
        size="sm"
        outline
        color="primary"
        label="Add new"
        icon-right="add"
        @click="$router.push({ name: 'create_collection' })"
      />
    </div>

    <q-table
      title="Collections"
      no-data-label="There is no collections as of now!"
      no-results-label="The filter didn't find any collections"
      loading-label="Fetching collections..."
      class="q-mt-lg"
      row-key="id"
      :rows="collections"
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
            :to="{ name: 'update_collection', params: { id: props.value } }"
          />
        </q-td>
      </template>

      <template v-slot:body-cell-actions="collection">
        <q-td :value="collection.id">
          <q-btn
            dense
            round
            flat
            color="grey"
            @click="deleteRow(collection)"
            icon="delete"
          ></q-btn>
        </q-td>
      </template>

      <template v-slot:loading>
        <table-loader v-if="loading" />
      </template>
      <template v-slot:no-data="{ message }">
        <no-data :message="message" />
      </template>
    </q-table>
  </q-page>
</template>

<script>
import { mapGetters } from 'vuex'
import COLLECTION from 'src/store/types/collections'
import AuthTypes from 'src/store/types/auth'
import TableLoader from 'src/components/loaders/TableLoader.vue'
import NoData from 'src/components/loaders/NoData.vue'
export default {
  components: { TableLoader, NoData },
  name: 'Collections',
  data () {
    return {
      filter: ''
    }
  },
  async mounted () {
    this.$store.commit('layout/SET_HEADER', 'Collections')
    await this.$store.dispatch(
      `${COLLECTION.namespace}/${COLLECTION.actions.GET_COLLECTIONS}`
    )
  },
  computed: {
    ...mapGetters({
      user: `${AuthTypes.namespace}/${AuthTypes.getters.GET_USER}`,
      collections: `${COLLECTION.namespace}/${COLLECTION.getters.GET_COLLECTIONS}`,
      tableHeader: `${COLLECTION.namespace}/${COLLECTION.getters.GET_COLLECTIONS_TABLE_HEADER}`,
      loading: `${COLLECTION.namespace}/${COLLECTION.getters.GET_LOADING}`
    })
  },
  methods: {
    deleteRow (collection) {
      this.$q
        .dialog({
          title: 'Confirm',
          message: 'Are you sure you want to delete ' + collection.row.id + '?',
          cancel: true,
          persistent: true
        })
        .onOk(() => {
          this.$store
            .dispatch(
              `${COLLECTION.namespace}/${COLLECTION.actions.DELETE_COLLECTION}`,
              collection.row.id
            )
            .then(
              (response) => {
                this.$q.notify({
                  type: 'positive',
                  message: `Successfully deleted ${collection.row.id}.`,
                  position: 'top'
                })
              },
              (errors) => {
                console.log(errors)
              }
            )
        })
    }
  }
}
</script>
