<template>
  <div class="text-center q-pa-lg">
    <q-icon size="64px" color="primary" name="list" />
    <div class="text-subtitle2">{{ message }}</div>
  </div>
</template>
<script>
export default {
  name: 'EmptyState',
  props: {
    message: {
      type: String,
      default: 'Empty'
    }
  }
}
</script>
