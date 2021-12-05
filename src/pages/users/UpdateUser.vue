<template>
  <q-page padding>
    <div class="flex justify-between align-center q-mt-md q-mb-xl">
      <q-breadcrumbs class="align-center q-pa-sm" style="font-size: 14px">
        <template v-slot:separator>
          <q-icon size="24px" name="chevron_right" />
        </template>
        <q-breadcrumbs-el to="/" label="Adopisoft Billing Machine" />
        <q-breadcrumbs-el label="Users" to="/users" />
        <q-breadcrumbs-el label="Update" />
      </q-breadcrumbs>
      <q-btn
        size="sm"
        outline
        color="primary"
        label="Reset Password"
        @click="openResetDialogFn"
      />
    </div>
    <q-card class="shadow-1 q-pb-md">
      <q-card-section>
        <div class="text-h6">Update User</div>
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
              <div class="text-subtitle2 q-mb-md">Role</div>
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
    <q-dialog v-model="openResetDialog" persistent position="top">
      <q-card class="q-mt-lg q-pb-sm" style="min-width: 450px">
        <q-card-section class="q-pb-none">
          <div class="text-h6 text-weight-regular no-margin">Reset password</div>
        </q-card-section>
        <q-card-section>
          <div class="text-subtitle2">Are you sure you want to reset the password of <b>{{ user.name }}</b> to default ? </div>
        </q-card-section>
        <q-card-actions align="right">
          <q-btn
            size="sm"
            padding="8px 16px"
            outline
            label="Cancel"
            color="primary"
            v-close-popup
          />
          <q-btn
            size="sm"
            padding="8px 16px"
            label="Confirm"
            color="primary"
            @click="resetPasswordFn"
          />
        </q-card-actions>
      </q-card>
    </q-dialog>
     <q-dialog v-model="openDisableDialog" persistent position="top">
      <q-card class="q-mt-lg q-pb-sm" style="min-width: 450px">
        <q-card-section class="q-pb-none">
          <div class="text-h6 text-weight-regular no-margin">Disable account</div>
        </q-card-section>
        <q-card-section>
          <div class="text-subtitle2">Are you sure you want to {{ user.disabled ? 'enable': 'disable'}} the account of <b>{{ user.name }}</b> ? </div>
        </q-card-section>
        <q-card-actions align="right">
          <q-btn
            size="sm"
            padding="8px 16px"
            outline
            label="Cancel"
            color="primary"
            v-close-popup
          />
          <q-btn
            size="sm"
            padding="8px 16px"
            label="Confirm"
            color="primary"
            @click="disableAccountFn"
          />
        </q-card-actions>
      </q-card>
    </q-dialog>
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
      <div class="q-gutter-sm">
        <q-btn
          v-if="user.disabled"
          outline
          color="positive"
          label="Enable Account"
          size="sm"
          padding="sm lg"
          @click="openDisableDialogFn"
        />
        <q-btn
          v-else
          outline
          color="negative"
          label="Disable Account"
          size="sm"
          padding="sm lg"
          @click="openDisableDialogFn"
        />
        <q-btn
          size="sm"
          color="primary"
          padding="sm lg"
          label="Save"
          @click="onUpdate"
          :loading="processing"
          :style="{ width: processing ? '150px' : '' }"
        >
          <template v-slot:loading>
            <q-spinner class="on-left" />
            Loading...
          </template>
        </q-btn>
      </div>
    </q-footer>
  </q-page>
</template>
<script>
import USER from 'src/store/types/users'
import { mapActions, mapGetters } from 'vuex'
import AppConstant from 'src/constant/app'
import Validation from 'src/util/rules'
import UserErrors from 'src/store/modules/users/errors'
import { resetErrorValues, setErrorValues } from 'src/util/validation'
import { Notify } from 'quasar'
export default {
  name: 'UpdateUser',
  data: () => ({
    user: {
      name: null,
      email: null,
      roles: null,
      disabled: false
    },
    validation: Validation,
    hasError: UserErrors,
    openResetDialog: false,
    openDisableDialog: false
  }),
  methods: {
    ...mapActions({
      resetPassword: `${USER.namespace}/${USER.actions.RESET_PASSWORD}`,
      disableAccount: `${USER.namespace}/${USER.actions.DISABLE_ACCOUNT}`
    }),
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
    },
    openResetDialogFn () {
      this.openResetDialog = true
    },
    openDisableDialogFn () {
      this.openDisableDialog = true
    },
    resetPasswordFn () {
      this.openResetDialog = false
      this.resetPassword(this.user.id)
        .then(success => {
          if (success) {
            Notify.create({
              position: 'top',
              type: 'positive',
              message: `Successfully reset ${this.user.name} password.`
            })
          }
        }).catch(() => {
          Notify.create({
            position: 'top',
            type: 'negative',
            message: `Fail in reseting ${this.user.name} password.`
          })
        })
    },
    disableAccountFn () {
      this.openDisableDialog = false
      this.disableAccount({
        id: this.user.id,
        status: (!this.user.disabled) ? 1 : 0
      }).then(success => {
        if (success) {
          this.user.disabled = !this.user.disabled
          Notify.create({
            position: 'top',
            type: 'positive',
            message: `Successfully ${!this.user.disabled ? 'enabled' : 'disabled'} ${this.user.name} account.`
          })
        }
      })
    }
  },
  computed: {
    ...mapGetters({
      userData: `${USER.namespace}/${USER.getters.GET_USER}`,
      roles: `${USER.namespace}/${USER.getters.GET_ROLES}`,
      loading: `${USER.namespace}/${USER.getters.GET_LOADING}`
    }),
    processing () {
      return this.loading && !!this.user.name
    }
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
        roles: this.userData.roles.map((role) => role.name)[0]
      }
    )
    console.log(this.user)
  }
}
</script>
