<template>
  <q-page padding>
    <div class="q-pa-md q-gutter-sm">
      <q-breadcrumbs>
        <q-breadcrumbs-el icon="home" to="/" />
        <q-breadcrumbs-el label="Units" to="/units" />
        <q-breadcrumbs-el label="Create Unit" />
      </q-breadcrumbs>
    </div>
    <div class="q-ma-lg">
        <q-p> <strong>Information</strong></q-p>
        <div class="q-pa-md q-gutter-lg row items-start justify-around">
            <q-input class="col-5" outlined label="Name"  />
            <q-input class="col-5" outlined label="Funds"   type="number"/>
        </div>
        <q-p><strong>Address or Location</strong></q-p>
        <div class="q-pa-md q-gutter-lg row items-start justify-around">
            <q-input class="col-3" outlined label="Postal Code"  />
            <q-input class="col-3" outlined label="Province"  />
            <q-input class="col-3" outlined label="City"  />
        </div>
        <div class="q-pa-md q-gutter-lg row items-start justify-around">
            <q-input class="col-3" outlined label="Municipality"  />
            <q-input class="col-3" outlined label="Barangay"  />
            <q-input class="col-3" outlined label="Street"  />
        </div>
    </div>
    <div class="absolute-bottom-right q-ma-md">
        <q-btn align="around" class="q-mr-md" @click="$router.replace('/units/create-unit')" color="negative" label="Reset" />
        <q-btn align="around" @click="$router.replace('/units/create-unit')" color="primary" label="Save" />
    </div>
  </q-page>
</template>
