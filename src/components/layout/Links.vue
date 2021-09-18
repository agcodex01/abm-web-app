<template>
  <q-list bordered separator class="text-white">
    <q-item class="q-pa-lg">
      <q-item-section avatar>
        <q-avatar size="32px">
          <img
            src="~assets/logo.png"
          />
        </q-avatar>
      </q-item-section>
      <q-item-section>
        <q-item-label class="text-weight-bold">ADOPISOFT</q-item-label>
        <q-item-label caption lines="1" class="text-white"
          >Billing Machine</q-item-label
        >
      </q-item-section>
    </q-item>

    <link-item v-for="link in links" :key="link.title" v-bind="link" />
  </q-list>
</template>

<script>
import LinkItem from './LinkItem.vue'
import { mapGetters } from 'vuex'
export default {
  name: 'Links',
  components: {
    LinkItem
  },
  computed: {
    ...mapGetters({
      links: 'layout/getLinks'
    })
  }
}
</script>
