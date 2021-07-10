<template>
  <q-card class="bg-primary text-white q-px-sm">
    <q-card-section>
      <q-list>
        <q-item>
          <q-item-section avatar class="q-px-none" >
            <q-icon size="64" :name="icon"/>
              </q-item-section>
                <q-item-section class="text-h5" v-text="value"/>
              </q-item>
          </q-list>
        </q-card-section>
      <q-separator dark/>
    <q-card-section v-text="label"/>
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
