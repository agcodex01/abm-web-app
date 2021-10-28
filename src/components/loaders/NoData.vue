<template>
  <div class="full-width text-subtitle1 text-center text-primary">
    {{ message }}
  </div>
</template>
<script>
export default {
  name: 'NoData',
  props: {
    message: {
      required: true,
      default () {
        return 'Fetching data...'
      }
    }
  }
}
</script>
