<template>
  <q-page padding>
    <div class="q-mt-md q-mb-xl">
      <q-breadcrumbs class="align-center q-pa-sm" style="font-size: 14px">
        <template v-slot:separator>
          <q-icon size="24px" name="chevron_right" />
        </template>
        <q-breadcrumbs-el to="/" label="Adopisoft Billing Machine" />
        <q-breadcrumbs-el label="Settings" />
      </q-breadcrumbs>
    </div>
    <q-card-section>
      <q-list bordered>
        <q-item-label header class="text-subtitle2">Transaction</q-item-label>
        <q-item>
          <q-item-section class="text-subtitle2">Fee</q-item-section>
          <q-item-section side>
            <q-input
              v-model="setting.fee"
              type="number"
              outlined
              dense
              :loading="loading && !setting.fee"
              :rules="[
                v => !!v || 'Fee is required',
                v => v > 0 || 'Fee must be greater than 0.'
              ]"
            />
          </q-item-section>
        </q-item>
      </q-list>
    </q-card-section>

    <q-footer
      class="bg-white q-py-sm q-px-md text-right"
      reveal
      bordered
      align="rigth"
    >
      <q-btn
        size="sm"
        color="primary"
        padding="sm lg"
        label="Save"
        :loading="loading && setting.fee > 0"
        :style="{ width: loading && setting.fee ? '150px' : '' }"
        @click="updateSetting(setting)"
      >
        <template v-slot:loading>
          <q-spinner class="on-left" />
          Loading...
        </template>
      </q-btn>
    </q-footer>
  </q-page>
</template>

<script>
import SETTING from 'src/store/types/setting'
import { mapActions, mapGetters } from 'vuex'
import Validation from 'src/util/rules'
export default {
  name: 'Settings',
  data: () => ({
    setting: {
      fee: 0
    },
    validation: Validation
  }),
  async mounted () {
    this.$store.commit('layout/SET_HEADER', 'Settings')
    await this.$store.dispatch(
      `${SETTING.namespace}/${SETTING.actions.GET_SETTING}`
    )
    this.setting = Object.assign({}, this.settingData)
  },
  methods: {
    ...mapActions({
      updateSetting: `${SETTING.namespace}/${SETTING.actions.UPDATE_SETTING}`
    })
  },
  computed: {
    ...mapGetters({
      settingData: `${SETTING.namespace}/${SETTING.getters.GET_SETTING}`,
      loading: `${SETTING.namespace}/${SETTING.getters.GET_LOADING}`
    })
  }
}
</script>
