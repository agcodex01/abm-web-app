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
      header: 'Your account is disabled.',
      subHeader: 'Contact admin for more inforamtion.'
    }
  })
}
</script>
