<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated class="bg-brown-14">
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="leftDrawerOpen = !leftDrawerOpen"
        />

        <q-toolbar-title>
          IVA / IRPF
        </q-toolbar-title>

        <div class="q-my-md">
          <q-select class="bg-white" dense outlined v-model="anySeleccionat" :options="arrAnys" label="Any:" @input="canviarAny"/>
        </div>
        

        <!-- <div>Quasar v{{ $q.version }}</div> -->
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
      content-class="bg-grey-1"
    >
      <q-list dense>
        <q-item-label
          header
          class="text-grey-8"
        >
          Menu
        </q-item-label>
        <q-separator />
        <q-item to="/facturacio">
          <q-item-section>Facturació</q-item-section>
        </q-item>
        <q-separator />
        <q-item to="/despesesIVA">
          <q-item-section>Despeses IVA soportat</q-item-section>
        </q-item>
        <q-separator />
        <q-item to="/iva">
          <q-item-section>IVA</q-item-section>
        </q-item>
        <q-separator />
        <q-item to="/irpf">
          <q-item-section>IRPF</q-item-section>
        </q-item>
        <q-separator />

      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>


export default {
  name: 'MainLayout',
  data () {
    return {
      leftDrawerOpen: false,
      anySeleccionat: null
    }
  },

  computed: {
    arrAnys(){
      return this.$store.getters["mImpostos/getArrAnys"]
    }
  },

  methods: {
    canviarAny () {
      this.$store.commit("mImpostos/canviAny", this.anySeleccionat)
    }
  }


}
</script>
