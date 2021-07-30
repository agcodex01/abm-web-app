<template>
  <q-page padding>
    <div class="q-pa-md q-gutter-sm">
      <q-breadcrumbs>
        <q-breadcrumbs-el icon="home" to="/" />
        <q-breadcrumbs-el label="Units" to="/units" />
        <q-breadcrumbs-el label="Create Unit" />
      </q-breadcrumbs>
    </div>
    <div>
      <h5 class="text-grey-7">Information</h5>
      <div class="row q-col-gutter-sm">
        <div class="col col-md-6">
          <q-input outlined label="Name"/>
        </div>
        <div class="col col-md-6">
          <q-input outlined label="Funds" type="number" />
        </div>
      </div>
      <h5 class="text-grey-7">Address or Location</h5>
      <div class="row q-col-gutter-sm">
        <div class="col col-md-4">
          <q-input outlined label="Postal Code"/>
        </div>
        <div class="col col-md-4">
          <q-input outlined label="Province"/>
        </div>
        <div class="col col-md-4">
          <q-input outlined label="City" />
        </div>
         <div class="col col-md-4">
          <q-input outlined label="Municipality"/>
        </div>
        <div class="col col-md-4">
          <q-input outlined label="Barangay"/>
        </div>
        <div class="col col-md-4">
          <q-input outlined label="Street" />
        </div>
      </div>
    </div>
    <div class="absolute-bottom-right q-ma-md">
      <q-btn
        align="around"
        class="q-mr-md"
        @click="$router.replace('/units/create-unit')"
        color="negative"
        label="Reset"
      />
      <q-btn
        align="around"
        @click="$router.replace('/units/create-unit')"
        color="primary"
        label="Save"
      />
    </div>
  </q-page>
</template>
