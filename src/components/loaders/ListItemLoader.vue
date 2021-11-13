<template>
  <q-item>
      <q-item-section>
        <q-item-label>
          <q-skeleton type="text" width="80%"/>
        </q-item-label>
        <q-item-label caption>
          <q-skeleton type="text" width="35%"/>
        </q-item-label>
        <q-item-label caption>
          <q-skeleton type="text" width="60%"/>
        </q-item-label>
      </q-item-section>
    </q-item>
</template>
<script>
export default {
  name: 'ListItemLoader'
}
</script>
