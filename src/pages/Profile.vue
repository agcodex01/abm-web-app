<template>
  <q-page padding>
    <div class="flex justify-between align-center q-mt-md q-mb-xl">
      <q-breadcrumbs class="align-center q-pa-sm" style="font-size: 14px">
        <template v-slot:separator>
          <q-icon size="24px" name="chevron_right" />
        </template>
        <q-breadcrumbs-el to="/" label="Adopisoft Billing Machine" />
        <q-breadcrumbs-el label="Profile" />
      </q-breadcrumbs>
      <q-btn
        size="sm"
        outline
        color="primary"
        label="Edit Profile"
        icon-right="edit"
        @click="showModal"
      />
    </div>
    <q-card>
      <q-card-section>
        <div class="row q-py-lg">
          <div class="col-6 text-center">
            <q-avatar color="primary" text-color="white" size="100px">{{
              user.name?.charAt(0)
            }}</q-avatar
            ><br /><br />
            <q-chip
              v-for="(role, i) in user.roles"
              :key="i"
              :label="role.name"
              outline
              dense
              color="primary"
            />
          </div>
          <div class="col-6">
            <div class="text-subtitle2 q-mb-sm">Name</div>
            <q-input type="text" v-model="user.name" outlined dense disable />
            <div class="text-subtitle2 q-my-sm">Email</div>
            <q-input type="email" outlined v-model="user.email" disable dense />
          </div>
        </div>
      </q-card-section>
    </q-card>

    <q-dialog v-model="opened" persistent position="top">
      <q-card style="min-width: 350px; top: 30px">
        <q-card-section>
          <p class="text-subtitle1 text-bold">Edit Profile Details</p>
          <q-form ref="profileForm">
            <q-input
              type="text"
              label="Name"
              outlined
              v-model="user.name"
              dense
              :error="hasError.name.error"
              :error-message="hasError.name.message"
              :rules="[(val) => validator.required(val, 'name')]"
            />
            <q-input
              type="email"
              label="Email"
              outlined
              v-model="user.email"
              dense
              :error="hasError.email.error"
              :error-message="hasError.email.message"
              :rules="[(val) => validator.required(val, 'email')]"
            />
          </q-form>
        </q-card-section>

        <q-card-actions align="right" class="text-primary q-px-md">
          <q-btn
            size="sm"
            unelevated
            outline
            padding="sm md"
            color="negative"
            label="Close"
            v-close-popup
          />
          <q-btn
            size="sm"
            color="primary"
            padding="sm lg"
            label="Save"
            @click="updateProfile"
            :loading="loading"
            :style="{ width: loading ? '150px' : '' }"
          />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-page>
</template>
<script>
import { mapGetters } from 'vuex'
import USER from 'src/store/types/users'
import AppConstant from 'src/constant/app'
import Validation from 'src/util/rules'
import AuthTypes from 'src/store/types/auth'
import UserErrors from 'src/store/modules/users/errors'
import { resetErrorValues, setErrorValues } from 'src/util/validation'

export default {
  name: 'Profile',
  data () {
    return {
      user: {
        name: null,
        email: null,
        roles: []
      },
      roles: [],
      opened: false,
      validator: Validation,
      hasError: UserErrors
    }
  },
  methods: {
    showModal () {
      this.opened = true
    },
    async updateProfile () {
      const tempUser = Object.assign({}, this.user)
      delete tempUser.roles
      this.$refs.profileForm.validate().then(async (valid) => {
        if (valid) {
          await this.$store
            .dispatch(`${USER.namespace}/${USER.actions.UPDATE_USER}`, {
              user: tempUser,
              id: this.user.id
            })
            .then(({ data }) => {
              if (data) {
                this.$q.notify(
                  AppConstant.SUCCESS_MSG(
                    `Successfully updated ${this.user.name} info.`
                  )
                )
                this.$store.commit(
                  `${AuthTypes.namespace}/${AuthTypes.mutations.SET_USER}`,
                  Object.assign({}, this.user)
                )
                this.opened = false
              }
            })
            .catch((errors) => {
              setErrorValues(this.hasError, errors)
            })
        }
      })
    }
  },
  computed: {
    ...mapGetters({
      header: 'layout/getHeader',
      userData: `${USER.namespace}/${USER.getters.GET_USER}`,
      rolesData: `${USER.namespace}/${USER.getters.GET_ROLES}`,
      loading: `${USER.namespace}/${USER.getters.GET_LOADING}`
    })
  },
  async mounted () {
    this.$store.commit('layout/SET_HEADER', 'Profile')
    resetErrorValues(this.hasError)
    await this.$store.dispatch(`${USER.namespace}/${USER.actions.GET_ROLES}`)
    await this.$store.dispatch(
      `${USER.namespace}/${USER.actions.GET_USER}`,
      this.$route.params.id
    )
    this.user = Object.assign({}, this.userData)
    this.rolesData.forEach((role) => {
      this.roles.push(Object.assign({}, role))
    })
    this.roles.forEach((role) => {
      role.value = this.user.roles
        .map((userRole) => userRole.name)
        .includes(role.label)
    })
  }
}
</script>
