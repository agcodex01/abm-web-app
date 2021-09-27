<template>
  <errors :error="error"/>
</template>

<script>
import Errors from 'src/components/Errors.vue'

export default {
  components: { Errors },
  name: 'Error404',
  data: () => ({
    error: {
      header: '404 | Not Found',
      subHeader: 'We didn\'t find anything for you.'
    }
  })
}
</script>
