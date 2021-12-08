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
            :error="hasError.email.error"
            :error-message="hasError.email.message"
            :rules="[(val) => validation.required(val, 'email')]"
          />
          <q-input
            v-model="credentials.password"
            type="password"
            label="Password"
            outlined
            dense
            :error="hasError.password.error"
            :error-message="hasError.password.message"
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
import UserErrors from 'src/store/modules/users/errors'
import { resetErrorValues, setErrorValues } from 'src/util/validation'
export default {
  name: 'Login',
  data () {
    return {
      credentials: {
        email: null,
        password: null
      },
      validation: Validation,
      hasError: UserErrors
    }
  },
  methods: {
    ...mapActions({
      login: `${AuthTypes.namespace}/${AuthTypes.actions.LOGIN}`
    }),
    startLogin () {
      resetErrorValues(this.hasError)
      this.$refs.authForm.validate().then((isValid) => {
        if (isValid) {
          this.login(this.credentials)
            .then((result) => {
              this.$router.push({
                name: 'dashboard'
              })
            })
            .catch((errors) => {
              setErrorValues(this.hasError, errors)
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
  },
  mounted () {
    resetErrorValues(this.hasError)
  }
}
</script>
