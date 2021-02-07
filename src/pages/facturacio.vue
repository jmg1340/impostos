<template>
  <div class="q-ma-md">
		<!-- {{ getArrLlogaters2}} -->

    <q-list bordered class="rounded-borders">
      <q-expansion-item
        v-for="(objLlogater) in arrFacturesPerClient"
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
    getArrObjFactures() {
      return this.$store.getters["mImpostos/getArrObjFactures"] ;
    },
    getArrIdClients () {
      return this.$store.getters["mImpostos/arrIdClients"] ;
    },
    getClients () {
      return this.$store.state.mImpostos.clients;
    },

    arrFacturesPerClient (){
      const arr = []
      this.getArrIdClients.map ( id => {
        const obj = {}
        obj.nom = this.getClients[id].nom
        obj.factures = this.getArrObjFactures.filter( objFactura => objFactura.idClient === id )

        arr.push(obj)
      })
      return arr
    }

  },
};
</script>

<style>
</style>