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
        <q-breadcrumbs-el label="Profile"/>
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
      <q-card-section style="text-align: center">
        <q-avatar color="primary" text-color="white" size="100px">A</q-avatar>
      <p class="text-subtitle1 text-bold" >{{ user.roles[0].name }}</p>
        <q-form>
          <div class="row row q-col-gutter-sm">
            <q-input
              class="col col-md-6"
              type="text"
              label="Name"
              filled
              v-model="user.name"
              readonly
              dense
            />
            <q-input
              class="col col-md-6"
              type="email"
              label="Email"
              filled
              v-model="user.email"
              readonly
              dense
            />
          </div>
        </q-form>
      </q-card-section>
    </q-card>

      <q-dialog v-model="opened" persistent>
        <q-card style="min-width: 350px">
          <q-card-section>
            <q-card-section style="text-align: center">
          <p class="text-subtitle1 text-bold">Edit Profile Information</p>
          <q-form >
            <div class="row row q-col-gutter-sm">
              <q-input
                class="col col-md-6"
                type="text"
                label="Name"
                outlined
                v-model="user.name"
                dense
              />
              <q-input
                class="col col-md-6"
                type="email"
                label="Email"
                outlined
                v-model="user.email"
                dense
              />
            </div>
          </q-form>
        </q-card-section>
        </q-card-section>

        <q-card-actions align="right" class="text-primary">
          <q-btn
            size="sm"
            unelevated
            outline
            padding="sm md"
            color="negative"
            label="Cancel/Close"
            v-close-popup />
          <q-btn
            size="sm"
            color="primary"
            padding="sm lg"
            label="Save"
            @click="updateProfile"
            :loading="loading"
            :style="{ width: loading ? '150px' : '' }"
            v-close-popup
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
import Types from 'src/store/types'
import { ref } from 'vue'

export default {
  name: 'Profile',
  data () {
    return {
      user: {
        name: null,
        email: null,
        roles: [{
          id: null,
          name: ''
        }]
      },
      roles: [],
      loading: false,
      opened: false,
      address: ref('')
    }
  },
  methods: {
    showModal () {
      this.opened = true
    },
    async updateProfile () {
      this.loading = true
      this.user.roles = this.roles
        .filter((role) => role.value)
        .map((role) => role.label)
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
        .catch((errors) => console.error(errors))
    }
  },
  computed: {
    ...mapGetters({
      header: 'layout/getHeader',
      userData: `${USER.namespace}/${USER.getters.GET_USER}`,
      rolesData: `${USER.namespace}/${USER.getters.GET_ROLES}`,
      loading: `${Types.GeneralTypes.namespace}/${Types.GeneralTypes.getters.GET_LOADING}`
    })
  },
  async mounted () {
    this.$store.commit('layout/SET_HEADER', 'Profile')
    await this.$store.dispatch(`${USER.namespace}/${USER.actions.GET_ROLES}`)
    await this.$store.dispatch(
      `${USER.namespace}/${USER.actions.GET_USER}`,
      this.$route.params.id
    )
    this.user = Object.assign({}, this.userData)
    this.rolesData.forEach(role => {
      this.roles.push(Object.assign({}, role))
    })
    this.roles.forEach(role => {
      role.value = this.user.roles
        .map(userRole => userRole.name)
        .includes(role.label)
    })
  }
}
</script>
