<template>
  <q-card class="q-px-sm text-primary border-primary no-box-shadow">
    <q-card-section>
      <q-list>
        <q-item>
          <q-item-section avatar>
            <q-avatar  class="border-primary" size="64" :icon="icon"/>
          </q-item-section>
          <q-item-section align="right" class="text-h5" v-text="value"/>
        </q-item>
      </q-list>
    </q-card-section>
    <q-separator dark color="primary"/>
    <q-card-section align="right" class="text-subtitle2" v-text="label"/>
  </q-card>
</template>
<script>
export default {
  name: 'DsSummary',
  props: {
    label: {
      type: String,
      required: true
    },
    value: {
      type: Number,
      required: true
    },
    icon: {
      type: String,
      default: ''
    },
    size: {
      type: Number,
      default: 16
    }
  }
}
</script>

<style lang="scss">
  .border-primary {
    border: 1px solid;
    border-color: $primary
  }
</style>
