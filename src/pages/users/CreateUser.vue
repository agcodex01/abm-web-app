<template>
  <q-page padding>
    <div class="flex justify-between align-center q-mt-md q-mb-xl">
      <q-breadcrumbs class="align-center q-pa-sm" style="font-size: 14px">
        <template v-slot:separator>
          <q-icon size="24px" name="chevron_right" />
        </template>
        <q-breadcrumbs-el to="/" label="Adopisoft Billing Machine" />
        <q-breadcrumbs-el label="Users" to="/users" />
        <q-breadcrumbs-el label="Create" />
      </q-breadcrumbs>
    </div>
    <q-card class="shadow-1 q-pb-md">
      <q-card-section>
        <div class="text-h6">Create User</div>
      </q-card-section>
      <q-card-section>
        <q-form class="q-gutter-lg" ref="userForm">
          <div class="row">
            <div class="col-md-6">
              <div class="text-subtitle2 q-mb-sm">Fullname</div>
              <q-input
                outlined
                dense
                v-model="user.name"
                type="text"
                :error="hasError.name.error"
                :error-message="hasError.name.message"
                :rules="[(v) => validation.required(v, 'name')]"
              />
              <div class="text-subtitle2 q-my-sm">Email</div>
              <q-input
                outlined
                dense
                :error="hasError.email.error"
                :error-message="hasError.email.message"
                v-model="user.email"
                type="email"
                :rules="[(v) => validation.required(v, 'email')]"
              />
              <div class="text-subtitle2 q-my-sm">Password</div>
              <q-input
                outlined
                dense
                v-model="user.password"
                :error="hasError.password.error"
                :error-message="hasError.password.message"
                :type="isPwd ? 'password' : 'text'"
                :rules="[
                  (v) => validation.required(v, 'password'),
                  (v) => validation.min(v, 'password', 8)
                ]"
              >
              <template v-slot:append>
                  <q-icon
                    :name="isPwd ? 'visibility_off' : 'visibility'"
                    class="cursor-pointer"
                    @click="isPwd = !isPwd"
                  />
                </template>
              </q-input>
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
                      type="radio"
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
import Validation from 'src/util/rules'
import UserErrors from 'src/store/modules/users/errors'
import { mapGetters } from 'vuex'
import { resetErrorValues, setErrorValues } from 'src/util/validation'
export default {
  name: 'CreateUser',
  data: () => ({
    user: {
      name: null,
      email: null,
      password: null,
      roles: null
    },
    loading: false,
    validation: Validation,
    hasError: UserErrors,
    isPwd: true
  }),
  computed: {
    ...mapGetters({
      roles: `${USER.namespace}/${USER.getters.GET_ROLES}`
    })
  },
  methods: {
    async onSave () {
      this.$refs.userForm.validate().then(async (data) => {
        if (data) {
          this.loading = true
          await this.$store
            .dispatch(
              `${USER.namespace}/${USER.actions.CREATE_USER}`,
              this.user
            )
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
            .catch((errors) => {
              setErrorValues(this.hasError, errors)
            })
            .finally(() => {
              this.loading = false
            })
        }
      })
    }
  },
  async mounted () {
    this.$store.commit('layout/SET_HEADER', 'Users')
    resetErrorValues(this.hasError)
    await this.$store.dispatch(`${USER.namespace}/${USER.actions.GET_ROLES}`)
  }
}
</script>
