<template>
  <router-view />
</template>
<script>
import { mapGetters } from 'vuex'
import AuthTypes from './store/types/auth'
import LAYOUT from './store/types/layout'
export default {
  name: 'App',
  computed: {
    ...mapGetters({
      user: `${AuthTypes.namespace}/${AuthTypes.getters.GET_USER}`
    })
  },
  mounted () {
    this.$echo
      .private(`App.Models.User.${this.user.id}`)
      .notification((data) => {
        this.$store.commit(
          `${LAYOUT.namespace}/${LAYOUT.mutations.ADD_NOTIFICATION}`,
          data
        )
      })
  }
}
</script>
