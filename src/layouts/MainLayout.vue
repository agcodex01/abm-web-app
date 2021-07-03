<template>
  <q-layout view="lHh Lpr lFf">
    <q-header class="bg-transparent text-dark" bordered>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleSidebar"
        />

        <q-toolbar-title v-text="header"/>

        <div>Administrator</div>
      </q-toolbar>
    </q-header>
    <q-drawer
      v-model="sideBarIsOpen"
      :width="250"
      show-if-above
      bordered
      class="bg-primary"
    >
      <links/>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { mapGetters } from 'vuex'
import Links from 'src/components/layout/Links.vue'

export default {
  name: 'MainLayout',
  components: {
    Links
  },
  data () {
    return {
      sideBarIsOpen: false
    }
  },
  methods: {
    toggleSidebar () {
      this.sideBarIsOpen = !this.sideBarIsOpen
    }
  },
  computed: {
    ...mapGetters({
      header: 'layout/getHeader'
    })
  }
}
</script>
