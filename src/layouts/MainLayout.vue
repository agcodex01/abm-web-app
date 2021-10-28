<template>
  <q-layout view="lHh Lpr lFf">
    <q-header class="bg-white text-dark" bordered>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleSidebar"
        />

        <q-toolbar-title v-text="header" />

        <div>{{ user.name }}</div>
        <q-btn class="q-ml-md" flat round dense icon="account_circle">
          <q-menu>
            <q-item-label header>Manage Account</q-item-label>
            <q-list style="min-width: 240px">
              <q-item clickable v-close-popup :to="{ name: 'update_profile', params: { id: user.id } }">
                <q-item-section avatar>
                  <q-icon name="account_circle" />
                </q-item-section>
                <q-item-section>Profile</q-item-section>
              </q-item>
              <q-separator />
              <q-item clickable @click="startLogout(user.id)">
                <q-item-section avatar>
                  <q-icon name="logout" />
                </q-item-section>
                <q-item-section>Logout</q-item-section>
                <q-item-section avatar>
                  <q-spinner v-show="loading"
                    color="primary"
                    size="2em"
                  />
                </q-item-section>
              </q-item>
            </q-list>
          </q-menu>
        </q-btn>
      </q-toolbar>
    </q-header>
    <q-drawer
      v-model="sideBarIsOpen"
      :width="250"
      show-if-above
      bordered
      class="bg-primary"
    >
      <links />
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import Links from 'src/components/layout/Links.vue'
import AuthTypes from 'src/store/types/auth'

export default {
  name: 'MainLayout',
  components: {
    Links
  },
  data () {
    return {
      sideBarIsOpen: false,
      showMenu: false
    }
  },
  methods: {
    ...mapActions({
      logout: `${AuthTypes.namespace}/${AuthTypes.actions.LOGOUT}`
    }),
    toggleSidebar () {
      this.sideBarIsOpen = !this.sideBarIsOpen
    },
    startLogout (id) {
      this.logout(this.user.id).then((response) => {
        this.$router.push({
          name: 'login'
        })
      }).catch((errors) => {
        this.$q.notify({
          message: 'Something went wrong. Please try again.',
          color: 'negative'
        })
      })
    }
  },
  computed: {
    ...mapGetters({
      header: 'layout/getHeader',
      user: `${AuthTypes.namespace}/${AuthTypes.getters.GET_USER}`,
      loading: `${AuthTypes.namespace}/${AuthTypes.getters.GET_LOADING}`
    })
  }
}
</script>
