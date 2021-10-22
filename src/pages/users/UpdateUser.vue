<template>
  <q-page padding>
    <div class="flex justify-between align-center q-mt-md q-mb-xl">
      <q-breadcrumbs class="align-center q-pa-sm" style="font-size: 14px">
        <template v-slot:separator>
          <q-icon size="24px" name="chevron_right" />
        </template>
        <q-breadcrumbs-el to="/" label="Adopisoft Billing Machine" />
        <q-breadcrumbs-el label="Users" to="/users" />
        <q-breadcrumbs-el label="Update User" />
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
              <q-input
                outlined
                dense
                v-model="user.name"
                type="text"
                :rules="[(v) => validation.required(v, 'name')]"
              />
              <div class="text-subtitle2 q-my-sm">Email</div>
              <q-input
                outlined
                dense
                :error="errors.email.hasError"
                :error-message="errors.email.message"
                v-model="user.email"
                type="email"
                :rules="[(v) => validation.required(v, 'email')]"
              />
            </div>
            <div class="col-md-6 q-px-lg">
              <div class="text-subtitle2 q-mb-md">Roles</div>
              <div class="q-gutter-sm">
                <q-field
                  :model-value="user.roles"
                  borderless
                  no-error-icon
                  dense
                  :rules="[(v) => validation.required(v, 'role')]"
                >
                  <template v-slot:control>
                    <q-option-group
                      dense
                      v-model="user.roles"
                      inline
                      type="checkbox"
                      color="primary"
                      :options="roles"
                    />
                  </template>
                </q-field>
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
        @click="onUpdate"
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
import USER from 'src/store/types/users'
import { mapGetters } from 'vuex'
import AppConstant from 'src/constant/app'
import Validation from 'src/util/rules'
import UserErrors from 'src/store/modules/users/errors'
export default {
  name: 'UpdateUser',
  data: () => ({
    user: {
      name: null,
      email: null,
      roles: []
    },
    loading: false,
    validation: Validation,
    errors: UserErrors
  }),
  methods: {
    async onUpdate () {
      this.loading = true
      await this.$store
        .dispatch(`${USER.namespace}/${USER.actions.UPDATE_USER}`, {
          user: this.user,
          id: this.user.id
        })
        .then(({ data }) => {
          if (data) {
            this.$q.notify(
              AppConstant.SUCCESS_MSG(
                `Successfully updated ${this.user.name} info.`
              )
            )
            this.loading = false
          }
        })
        .catch((error) => {
          const errors = error.response.data.errors
          console.log(errors)
          if ('email' in errors) {
            this.errors.email.hasError = true
            this.errors.email.message = errors.email[0]
          }
        })
        .finally(() => {
          this.loading = false
        })
    }
  },
  computed: {
    ...mapGetters({
      userData: `${USER.namespace}/${USER.getters.GET_USER}`,
      roles: `${USER.namespace}/${USER.getters.GET_ROLES}`
    })
  },
  async mounted () {
    this.$store.commit('layout/SET_HEADER', 'Users')
    await this.$store.dispatch(`${USER.namespace}/${USER.actions.GET_ROLES}`)
    await this.$store.dispatch(
      `${USER.namespace}/${USER.actions.GET_USER}`,
      this.$route.params.id
    )
    this.user = Object.assign(
      {},
      {
        ...this.userData,
        roles: this.userData.roles.map((role) => role.name)
      }
    )
  }
}
</script>
