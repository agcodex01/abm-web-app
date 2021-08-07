<template>
  <router-view />
</template>
<script>
// import Auth from './services/AuthService'
export default {
  name: 'App'
  // async mounted () {
  //   await Auth.login({
  //     email: 'admin@adopisoft.com',
  //     password: '@dm1n1$tr@t0r'
  //   })
  //     .then((response) => {
  //       console.log(response)
  //     })
  //     .catch((error) => {
  //       console.error(error)
  //     })
  //   await this.$api
  //     .get('/user')
  //     .then((response) => {
  //       console.log(response)
  //     })
  //     .catch((error) => {
  //       console.error(error)
  //     })
  // this.$api.get('/user')
  //   .then(response => console.log(response))
  //   .catch(error => console.error(error))
  // }
}
</script>
