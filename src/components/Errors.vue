<template>
  <div class="fullscreen bg-primary text-white text-center q-pa-md flex flex-center">
    <div>
      <div style="font-size: 12vh">
        {{ error.header }}
      </div>

      <div class="text-h4" style="opacity:.4">
       {{ error.subHeader }}
      </div>
      <q-btn
        v-if="$route.name === 'account_disabled'"
        class="q-mt-xl"
        :to="{name: 'login'}"
        color="primary"
        label="Back to Login"
      />
      <q-btn
        v-else
        class="q-mt-xl"
        color="white"
        text-color="blue"
        unelevated
        to="/"
        label="Go Home"
        no-caps
      />
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'Errors',
  props: {
    error: {
      type: Object,
      required: true
    }
  }
})
</script>
