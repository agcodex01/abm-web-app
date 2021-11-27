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
        <q-form @submit="startLogin" ref="authForm" class="q-gutter-md">
          <q-input
            v-model="credentials.email"
            type="email"
            label="Email"
            outlined
            dense
            :error="emailErrors.email.hasError"
            :error-message="emailErrors.email.message"
            :rules="[(val) => validation.required(val, 'email')]"
          />
          <q-input
            v-model="credentials.password"
            type="password"
            label="Password"
            outlined
            dense
            lazy-rules
            :error="emailErrors.password.hasError"
            :error-message="emailErrors.password.message"
            :rules="[
              (val) => validation.required(val, 'password'),
              (val) => validation.min(val, 'password', 8)
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
import Validation from 'src/util/rules'
import { mapActions, mapGetters } from 'vuex'
import AuthTypes from 'src/store/types/auth'
export default {
  name: 'Login',
  data () {
    return {
      credentials: {
        email: null,
        password: null
      },
      validation: Validation,
      emailErrors: {
        email: {
          hasError: false,
          message: ''
        },
        password: {
          hasError: false,
          message: ''
        }
      }
    }
  },
  methods: {
    ...mapActions({
      login: `${AuthTypes.namespace}/${AuthTypes.actions.LOGIN}`
    }),
    startLogin () {
      this.$refs.authForm.validate().then((isValid) => {
        if (isValid) {
          this.login(this.credentials)
            .then((result) => {
              console.log('SUCCESS AUTH')
              this.$router.push({
                name: 'dashboard'
              })
            })
            .catch((errors) => {
              if ('email' in errors) {
                this.emailErrors.email.hasError = true
                this.emailErrors.email.message = errors.email[0]
              }
              if ('password' in errors) {
                this.emailErrors.password.hasError = true
                this.emailErrors.password.message = errors.password[0]
              }
            })
        }
      })
    }
  },
  computed: {
    ...mapGetters({
      loading: `${AuthTypes.namespace}/${AuthTypes.getters.GET_LOADING}`,
      user: `${AuthTypes.namespace}/${AuthTypes.getters.GET_USER}`
    })
  }
}
</script>
