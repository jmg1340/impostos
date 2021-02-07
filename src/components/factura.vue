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
            <div class="col">CONCEPTE</div> 
            <div class="col-2 text-right">IMPORT</div> 
            <div class="col-2 text-right">IVA</div> 
            <div class="col-2 text-right">IRPF</div> 
          </q-item>
          <q-item v-for="(item, index) in items2" :key="factura2.data + index" class="row">
            <div class="col borde">
              {{ item.concepte }}
            </div>
            <div class="col-2 text-right borde">
              {{ item.import1 }}
            </div>
            <div class="col-2 text-right borde">
              <span v-if="item.p_iva != 0"> {{ item.importIva }}  ({{ item.p_iva*100 }}%)</span>
            </div>
            <div class="col-2 text-right borde">
              <span v-if="item.p_irpf != 0"> {{ item.importIrpf }}  ({{ item.p_irpf*100 }}%)</span>
            </div>
          </q-item>

          <!-- <q-separator /> -->

          <q-item>
            <div class="col"> TOTAL</div> 
            <div class="col-2 text-right">{{ total.import }}</div> 
            <div class="col-2 text-right">{{ total.iva }}</div> 
            <div class="col-2 text-right">{{ total.irpf }}</div> 
          </q-item>
          
          
          <q-item>
            <div class="col">A pagar: 
              <q-chip dense class="glossy" color="red" text-color="white">{{ rebutBanc * 2}}€ </q-chip> ({{ rebutBanc }} x 2)
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
        obj.importIva = this.round( obj.import1 * obj.p_iva ,2),
        obj.importIrpf = this.round( obj.import1 * obj.p_irpf ,2)
        return obj
      })
    },

    total () {
      return { 
        iva: this.round( this.items2.reduce( (total, obj) => total += obj.importIva, 0 ),  2), 
        irpf: this.round( this.items2.reduce( (total, obj) => total += obj.importIrpf, 0 ),  2), 
        import:this.round( this.items2.reduce( (total, obj) => total += obj.import1, 0 ),  2)
      }
    },

    rebutBanc () {
      return this.round( (this.total.import + this.total.iva - this.total.irpf) , 2)
    }
  },

  methods: {
    round (value, decimals) {
      return Number(Math.round(value + "e" + decimals) + "e-" + decimals);
    } 
  }


}
</script>

<style>
  .borde {
    border-bottom: 1px solid grey;
    background-color: rgb(233, 233, 233);
  }
</style>