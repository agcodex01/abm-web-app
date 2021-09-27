<template>
  <errors :error="error"/>
</template>

<script>
import Errors from 'src/components/Errors.vue'

export default {
  name: 'AccessDenied',
  components: { Errors },
  data: () => ({
    error: {
      header: '403 | Forbidden',
      subHeader: 'You don\'t have access to this page.'
    }
  })
}
</script>
