<template>
  <div>
    <h1>
      <article>
      </article>
    </h1>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
  data () {
    return {
      id: this.$route.params.id,
      template: {}
    }
  },
  computed: {
    ...mapGetters({
      transactions: 'transactions/getTransactions'
    })
  },
  created () {
    console.log(this.transactions)
    this.template = this.transactions
  }
}
</script>
