<template>
  <q-item clickable :to="link" active-class="bg-secondary" exact v-if="showLink(roles)">
    <q-item-section v-if="icon" avatar>
      <q-icon :name="icon" />
    </q-item-section>
    <q-item-section>
      <q-item-label>{{ title }}</q-item-label>
    </q-item-section>
  </q-item>
</template>
<script>
import AuthTypes from 'src/store/types/auth'
import { mapGetters } from 'vuex'
export default {
  name: 'LinkItem',
  props: {
    title: {
      type: String,
      required: true
    },
    link: {
      type: String,
      default: '#'
    },
    icon: {
      type: String,
      default: ''
    },
    roles: {
      type: Array,
      default () {
        return []
      }
    }
  },
  computed: {
    ...mapGetters({
      links: 'layout/getLinks',
      user: `${AuthTypes.namespace}/${AuthTypes.getters.GET_USER}`
    })
  },
  methods: {
    showLink (roles) {
      let hasRole = 0
      roles.forEach((role) => {
        hasRole = hasRole + this.user.roles.map(r => r.name).includes(role) ? 1 : 0
      })
      return hasRole > 0
    }
  }
}
</script>
