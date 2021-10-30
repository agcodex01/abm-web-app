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
import { resetErrorValues, setErrorValues } from 'src/util/validation'
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
    hasError: UserErrors
  }),
  methods: {
    async onUpdate () {
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
          }
        })
        .catch((errors) => {
          setErrorValues(this.hasError, errors)
        })
    }
  },
  computed: {
    ...mapGetters({
      userData: `${USER.namespace}/${USER.getters.GET_USER}`,
      roles: `${USER.namespace}/${USER.getters.GET_ROLES}`,
      loading: `${USER.namespace}/${USER.getters.GET_LOADING}`
    })
  },
  async mounted () {
    this.$store.commit('layout/SET_HEADER', 'Users')
    resetErrorValues(this.hasError)
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
