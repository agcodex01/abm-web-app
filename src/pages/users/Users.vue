<template>
  <q-page padding>
    <div class="flex justify-between align-center q-mt-md q-mb-xl">
      <q-breadcrumbs class="align-center q-pa-sm" style="font-size: 14px">
        <template v-slot:separator>
          <q-icon size="24px" name="chevron_right" />
        </template>
        <q-breadcrumbs-el to="/" label="Adopisoft Billing Machine" />
        <q-breadcrumbs-el label="Users" />
      </q-breadcrumbs>
      <q-btn
        size="sm"
        outline
        color="primary"
        label="Add User"
        icon-right="add"
        @click="$router.push({ name: 'create_user' })"
      />
    </div>
    <div class="row q-col-gutter-sm">
      <q-select
        class="col-3"
        filled
        v-model="userFilter.role"
        :options="roles"
        label="Roles"
        @update:model-value="updateFilter"
        clearable
        options-dense
        emit-value
        dense
      />
      <q-select
        class="col-3"
        filled
        v-model="userFilter.status"
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
      title="Users"
      no-data-label="There is no users as of now!"
      no-results-label="The filter didn't find any user."
      loading-label="Fetching users..."
      class="q-mt-lg"
      :rows="users"
      :columns="tableHeader"
      row-key="id"
      :filter="filter"
      :loading="loading"
      options-dense
      emit-value
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
            :to="{ name: 'update_user', params: { id: props.value } }"
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
            :label="props.value ? 'disabled' : 'active'"
          />
        </q-td>
      </template>
      <template v-slot:body-cell-roles="props">
        <q-td :props="props">
          <q-chip
            style="font-size: 12px"
            outline
            text-color="white"
            dense
            color="primary"
            v-for="role in props.row.roles"
            :label="role.name"
            :key="role.id"
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
import USER from 'src/store/types/users'
import { mapGetters } from 'vuex'
import TableLoader from 'src/components/loaders/TableLoader.vue'
import NoData from 'src/components/loaders/NoData.vue'
import { USER_STATUS } from 'util/user'
export default {
  components: { TableLoader, NoData },
  name: 'Users',
  data: () => ({
    filter: '',
    userFilter: {
      role: null,
      status: null
    },
    statuses: Object.values(USER_STATUS)
  }),
  computed: {
    ...mapGetters({
      users: `${USER.namespace}/${USER.getters.GET_USERS}`,
      tableHeader: `${USER.namespace}/${USER.getters.GET_USERS_TABLE_CONFIG}`,
      loading: `${USER.namespace}/${USER.getters.GET_LOADING}`,
      roles: `${USER.namespace}/${USER.getters.GET_ROLES}`
    })
  },
  methods: {
    async updateFilter () {
      await this.$store.dispatch(
        `${USER.namespace}/${USER.actions.GET_USERS}`,
        this.userFilter
      )
    }
  },
  async mounted () {
    this.$store.commit('layout/SET_HEADER', 'Users')
    this.$store.dispatch(`${USER.namespace}/${USER.actions.GET_ROLES}`)
    await this.$store.dispatch(
      `${USER.namespace}/${USER.actions.GET_USERS}`,
      this.userFilter
    )
  }
}
</script>
