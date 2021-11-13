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
        <q-btn
          class="q-mr-md"
          flat
          round
          dense
          icon="notifications_none"
          color="primary"
        >
        <q-badge v-if="unreadNotifications" color="red" floating v-text="unreadNotifications" />
          <q-menu transition-show="scale" transition-hide="scale">
            <q-item-label header>Notifications</q-item-label>
            <div class="q-px-sm q-mb-sm">
              <q-chip
                dense
                class="q-px-md q-py-sm"
                label="All"
                :outline="unRead == 1"
                color="primary"
                text-color="white"
                clickable
                @click="unRead = 0"
              />
              <q-chip
                dense
                class="q-px-md q-py-sm"
                label="Unread"
                :outline="unRead == 0"
                color="primary"
                text-color="white"
                clickable
                @click="unRead = 1"
              />
            </div>

            <q-list style="min-width: 240px;max-width:350px">
              <q-scroll-area style="height: 200px;">
                <div v-if="fetchingNotifications">
                  <list-item-loader v-for="n in 2" :key="n" />
                </div>
                <div v-else>
                  <q-item
                    clickable
                    v-close-popup
                    v-for="notification in notifications"
                    :key="notification.id"
                    :class="{'bg-info text-white': !notification.read_at}"
                    @click="readNotificationAction(notification.id)"
                  >
                  <q-item-section>
                    <q-item-label lines="1" v-text="notification.data.title"/>
                    <q-item-label caption lines="3" :class="{'text-white': !notification.read_at }">
                      <span class="text-weight-bold">{{ notification.data.message.split('--')[0] }}</span>
                      {{ notification.data.message.split('--')[1] }}
                    </q-item-label>
                    <q-item-label :class="{'text-white': !notification.read_at }" caption v-text="formatDate(notification.created_at)"/>
                  </q-item-section>
                  <q-separator />
                  </q-item>
                </div>
              </q-scroll-area>
              <q-separator />
              <q-btn class="full-width" color="primary" flat label="Mark all as read" :loading="hasNotifications && fetchingNotifications" @click="markAllAsRead(user.id)"/>
            </q-list>
          </q-menu>
        </q-btn>
        <div>{{ user.name }}</div>
        <q-btn
          class="q-ml-md"
          flat
          round
          dense
          icon="account_circle"
          color="primary"
        >
          <q-menu transition-show="scale" transition-hide="scale">
            <q-item-label header>Manage Account</q-item-label>
            <q-list>
              <q-item
                clickable
                v-close-popup
                :to="{ name: 'update_profile', params: { id: user.id } }"
              >
                <q-item-section avatar>
                  <q-icon name="account_circle" color="primary" />
                </q-item-section>
                <q-item-section>Profile</q-item-section>
              </q-item>
              <q-separator />
              <q-item clickable @click="startLogout(user.id)">
                <q-item-section avatar>
                  <q-icon name="logout" color="primary" />
                </q-item-section>
                <q-item-section>Logout</q-item-section>
                <q-item-section avatar>
                  <q-spinner v-show="loading" color="primary" size="2em" />
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
import LAYOUT from 'src/store/types/layout'
import { date } from 'quasar'
import AppConstant from 'src/constant/app'
import ListItemLoader from 'src/components/loaders/ListItemLoader.vue'

export default {
  name: 'MainLayout',
  components: {
    Links, ListItemLoader
  },
  data: () => ({
    sideBarIsOpen: false,
    showMenu: false,
    unRead: 0
  }),
  methods: {
    ...mapActions({
      logout: `${AuthTypes.namespace}/${AuthTypes.actions.LOGOUT}`,
      fetchNotifications: `${LAYOUT.namespace}/${LAYOUT.actions.GET_NOTIFICATIONS}`,
      readNotification: `${LAYOUT.namespace}/${LAYOUT.actions.READ_NOTIFICATION}`,
      markAllAsRead: `${LAYOUT.namespace}/${LAYOUT.actions.MARK_ALL_AS_READ_NOTIFICATIONS}`
    }),
    toggleSidebar () {
      this.sideBarIsOpen = !this.sideBarIsOpen
    },
    startLogout (id) {
      this.logout(this.user.id)
        .then((response) => {
          this.$router.push({
            name: 'login'
          })
        })
        .catch((errors) => {
          this.$q.notify({
            message: 'Something went wrong. Please try again.',
            color: 'negative'
          })
        })
    },
    formatDate (createdAt) {
      return date.formatDate(createdAt, AppConstant.DATE_FORMAT)
    },
    readNotificationAction (id) {
      this.readNotification({
        userId: this.user.id,
        id
      }).then(() => {
        this.$router.push({ name: 'transactions' })
      })
    }
  },
  computed: {
    ...mapGetters({
      header: 'layout/getHeader',
      user: `${AuthTypes.namespace}/${AuthTypes.getters.GET_USER}`,
      loading: `${AuthTypes.namespace}/${AuthTypes.getters.GET_LOADING}`,
      notifications: `${LAYOUT.namespace}/${LAYOUT.getters.GET_NOTIFICATIONS}`,
      unreadNotifications: `${LAYOUT.namespace}/${LAYOUT.getters.UNREAD_COUNT_NOTIFICATION}`,
      fetchingNotifications: `${LAYOUT.namespace}/${LAYOUT.getters.FETCHING_NOTIFICATIONS}`
    }),
    hasNotifications () {
      return this.notifications.length > 0
    }
  },
  watch: {
    unRead (val, oldVal) {
      this.fetchNotifications({
        userId: this.user.id,
        unRead: this.unRead
      })
    }
  },
  mounted () {
    this.fetchNotifications({
      userId: this.user.id,
      unRead: this.unRead
    })
  }
}
</script>
