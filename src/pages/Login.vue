<template>
  <div class="fullscreen bg-primary">
    <q-card style="width: 400px" class="fixed-center q-pa-lg">
      <q-card-section class="text-center q-pa-lg">
        <q-img
          class="q-mb-sm"
          src="~assets/logo.png"
          width="60px"
          spinner-color="primary"
          spinner-size="82px"
        />
        <h5 class="no-margin">Adopisoft Billing Machine</h5>
      </q-card-section>
      <q-card-section class="q-pa-lg">
        <q-form @submit="startLogin" class="q-gutter-md">
          <q-input
            v-model="credentials.email"
            type="email"
            label="Email"
            outlined
            dense
            :error="validation.email.hasError"
            :error-message="validation.email.message.exists"
            :rules="[(val) => !!val || validation.email.message.exists]"
          />
          <q-input
            v-model="credentials.password"
            type="password"
            label="Password"
            outlined
            dense
            :error="validation.password.hasError"
            :error-message="validation.password.message.incorrect"
            :rules="[
              (val) => !!val || validation.password.message.required,
              (val) => val.length >= 8 || validation.password.message.min
            ]"
          />
          <div>
            <q-btn
              class="full-width"
              label="Login"
              type="submit"
              color="primary"
              :loading="loading"
            >
              <template v-slot:loading>
                <q-spinner class="on-left" />
                Signing In...
              </template>
            </q-btn>
          </div>
        </q-form>
      </q-card-section>
      <q-card-section class="text-center">
        © 2021 Adopisoft. All rights reserved
      </q-card-section>
    </q-card>
  </div>
</template>
<script>
import Types from 'src/store/types'
import * as Rule from './../util/rules'
import { mapActions, mapGetters } from 'vuex'
export default {
  name: 'Login',
  data: () => ({
    credentials: {
      email: null,
      password: null
    },
    validation: {
      email: {
        hasError: false,
        message: {
          required: Rule.required('email'),
          exists: Rule.exists('email')
        }
      },
      password: {
        hasError: false,
        message: {
          required: Rule.required('password'),
          min: Rule.min(8, 'password'),
          incorrect: Rule.incorrect('password')
        }
      }
    }
  }),
  methods: {
    ...mapActions({
      login: `${Types.AuthTypes.namespace}/${Types.AuthTypes.actions.LOGIN}`
    }),
    startLogin () {
      this.login(this.credentials).then(result => {
        console.log('SUCCESS AUTH')
        this.$router.push({
          name: 'dashboard'
        })
      }).catch(error => {
        if ('email' in error) {
          this.validation.email.hasError = true
        }
        if ('password' in error) {
          this.validation.password.hasError = true
        }
        console.log(error.status)
      })
    }
  },
  computed: {
    ...mapGetters({
      loading: `${Types.GeneralTypes.namespace}/${Types.GeneralTypes.getters.GET_LOADING}`,
      user: `${Types.AuthTypes.namespace}/${Types.AuthTypes.getters.GET_USER}`
    })
  }
}
</script>
