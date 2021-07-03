<template>
  <router-view />
</template>
<script>

export default {
  name: 'App',
  mounted () {
    this.$api.get('/user')
      .then(response => console.log(response))
      .catch(error => console.error(error))
  }
}
</script>
