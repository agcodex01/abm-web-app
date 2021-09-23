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
        <q-breadcrumbs-el label="Users"/>
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
    <q-table
      title="Users"
      no-data-label="There is no users as of now!"
      no-results-label="The filter didn't find any user."
      :rows="users"
      :columns="tableHeader"
      row-key="id"
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
            :to="{ name: 'update_user', params: { id: props.value } }"
          />
        </q-td>
      </template>
      <template v-slot:body-cell-roles="props">
        <q-td :props="props">
          <q-chip style="font-size:12px" outline text-color="white" dense color="primary" v-for="role in props.row.roles"  :label="role.name" :key="role.id"/>
        </q-td>
      </template>
    </q-table>
  </q-page>
</template>

<script>
import USER from 'src/store/types/users'
import { mapGetters } from 'vuex'
export default {
  name: 'Users',
  data: () => ({
    filter: '',
    loading: true
  }),
  computed: {
    ...mapGetters({
      users: `${USER.namespace}/${USER.getters.GET_USERS}`,
      tableHeader: `${USER.namespace}/${USER.getters.GET_USERS_TABLE_CONFIG}`
    })
  },
  async mounted () {
    this.$store.commit('layout/SET_HEADER', 'Users')
    this.loading = true
    await this.$store.dispatch(`${USER.namespace}/${USER.actions.GET_USERS}`)
    this.loading = false
  }
}
</script>
