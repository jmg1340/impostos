<template>
  <div class="q-ma-md">
		<!-- {{ getArrLlogaters2}} -->

    <q-list bordered class="rounded-borders">
      <q-expansion-item
        v-for="(objLlogater) in getArrLlogaters2"
        :key="objLlogater.nom"
        expand-separator
        icon="perm_identity"
        :label="objLlogater.nom"
      >
        <q-card v-for="(factura, index) in objLlogater.factures" :key="objLlogater.nom + index">
          <jmg_factura :llogater="objLlogater.nom" :factura="factura" />
        </q-card>
      </q-expansion-item>
    </q-list>
  </div>
</template>

<script>
import jmg_factura from "../components/factura"
export default {

  components: { jmg_factura },
  computed: {
    getArrLlogaters2() {
      return this.$store.getters["mImpostos/getArrObjLlogaters"] ;
    },
  },
};
</script>

<style>
</style>