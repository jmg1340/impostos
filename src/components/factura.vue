<template>

    <q-item class="q-mb-md">
      <q-item-section class="bg-yellow-3">
        <p>
          <q-badge color="orange-6" text-color="black" class="q-ma-md">
            Data: {{ factura2.data }} <br>
            Fra: {{ factura2.num }} 
          </q-badge> 
        </p>
        <q-list dense >
          <q-item class="text-bold">
            <div class="col-3">CONCEPTE</div> 
            <div class="col">IMPORT</div> 
            <div class="col">IVA</div> 
            <div class="col">IRPF</div> 
          </q-item>
          <q-item v-for="(item, index) in items2" :key="factura2.data + index" class="row">
            <div class="col">
              {{ item.concepte }}
            </div>
            <div class="col">
              {{ item.import1 }}
            </div>
            <div class="col">
              <span v-if="item.p_iva != 0"> {{ item.importIva }}  ({{ item.p_iva*100 }}%)</span>
            </div>
            <div class="col">
              <span v-if="item.p_irpf != 0"> {{ item.importIrpf }}  ({{ item.p_irpf*100 }}%)</span>
            </div>
          </q-item>

          <q-separator />

          <q-item>
            <div class="col"> TOTAL</div> 
            <div class="col">{{ total.import }}</div> 
            <div class="col">{{ total.iva }}</div> 
            <div class="col">{{ total.irpf }}</div> 
          </q-item>
          
          
          <q-item>
            <div class="col"> Rebut del banc hauria de ser: 
              <q-chip dense class="glossy" color="red" text-color="white">{{ rebutBanc }} €</q-chip>
            </div> 
          </q-item>
        </q-list>


      </q-item-section>
    </q-item>


</template>

<script>
export default {
  props: [ "llogater", "factura" ],
  computed: {
    factura2 () {
      const arrData = this.factura.data.split("/")
      return {
        data: arrData[2] + "/" + arrData[1] + "/" + arrData[0],
        num: this.factura.numero + " / " + arrData[0]
      }
    },

    items2 () {
      return this.factura.items.map( obj => {
        obj.importIva = obj.import1 * obj.p_iva,
        obj.importIrpf = obj.import1 * obj.p_irpf
        return obj
      })
    },

    total () {
      return { 
        iva: this.items2.reduce( (total, obj) => total += obj.importIva, 0 ), 
        irpf: this.items2.reduce( (total, obj) => total += obj.importIrpf, 0 ), 
        import:this.items2.reduce( (total, obj) => total += obj.import1, 0 )
      }
    },

    rebutBanc () {
      return this.total.import + this.total.iva - this.total.irpf
    }
  }


}
</script>

<style>

</style>