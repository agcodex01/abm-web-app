<template>
  <q-page padding>
    <div class="flex justify-between align-center q-mt-md q-mb-xl">
      <q-breadcrumbs class="align-center q-pa-sm" style="font-size: 14px">
        <template v-slot:separator>
          <q-icon size="24px" name="chevron_right" />
        </template>
        <q-breadcrumbs-el to="/" label="Adopisoft Billing Machine" />
        <q-breadcrumbs-el label="Users" to="/users" />
        <q-breadcrumbs-el label="Create User" />
      </q-breadcrumbs>
    </div>
    <q-card class="shadow-1 q-pb-md">
      <q-card-section>
        <div class="text-h6">User Details</div>
      </q-card-section>
      <q-card-section>
        <q-form class="q-gutter-lg">
          <div class="row">
            <div class="col-md-6">
              <div class="text-subtitle2 q-mb-sm">Fullname</div>
              <q-input outlined dense v-model="user.name" type="text" />
              <div class="text-subtitle2 q-my-sm">Email</div>
              <q-input outlined dense v-model="user.email" type="email" />
              <div class="text-subtitle2 q-my-sm">Password</div>
              <q-input outlined dense v-model="user.password" type="password" />
            </div>
            <div class="col-md-6 q-px-lg">
              <div class="text-subtitle2 q-mb-sm">Roles</div>
              <div class="q-gutter-sm">
                <q-checkbox
                  v-for="role in roles"
                  :key="role.label"
                  v-model="role.value"
                  :label="role.label"
                />
              </div>
            </div>
          </div>
        </q-form>
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
        @click="onSave"
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
import AppConstant from 'src/constant/app'
import USER from 'src/store/types/users'
export default {
  name: 'CreateUser',
  data: () => ({
    user: {
      name: null,
      email: null,
      password: null,
      roles: null
    },
    roles: [
      {
        label: 'Admin',
        value: false
      },
      {
        label: 'Manager',
        value: false
      },
      {
        label: 'Collector',
        value: false
      }
    ],
    loading: false
  }),
  methods: {
    async onSave () {
      this.loading = true
      this.user.roles = this.roles
        .filter((role) => role.value)
        .map((role) => role.label)
      await this.$store
        .dispatch(`${USER.namespace}/${USER.actions.CREATE_USER}`, this.user)
        .then((user) => {
          this.$q.notify(
            AppConstant.SUCCESS_MSG('Successfully created a new user.')
          )
          this.$router.push({
            name: 'update_user',
            params: {
              id: user.id
            }
          })
        })
        .catch((errors) => console.error(errors))
        .finally(() => {
          this.loading = false
        })
    }
  },
  mounted () {
    this.$store.commit('layout/SET_HEADER', 'Users')
  }
}
</script>
