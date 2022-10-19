<template>
	<div class="column q-ma-md">
		<div class="col text-h5 text-center q-mb-xl">RESUM IVA (individual)</div>
		
				<q-card	v-for="T in 4" :key="T" class="q-mb-lg bg-grey-4">
					<q-card-section class="col bg-deep-orange-10 text-white text-h5 ">
						<!-- <q-banner class="col text-red-8 text-h4"> -->
							Trimestre {{T}}
							<!-- </q-banner> -->
					</q-card-section>

					<q-card-section>
						<div class="row justify-left q-gutter-md">
							<!-- IVA REPERCUTIT -->
							<div class="col">
								<q-table
										title="IVA DEVENGAT"
										:data="getArrQuadresTrimestres[T-1].resumFactures"
										:columns="columnes"
										row-key="fra"
										separator="cell"
										dense
										:pagination="initialPagination"
										:rows-per-page-options="[0]"
										class="capsalera"
										hide-bottom
									/>
							</div>
							<div class="col">
								<div class="column">
									<div class="col q-mb-xl">
										<!-- IVA SOPORTAT -->
										<q-table
												title="IVA DEDUIBLE"
												:data="getArrDespesesDelsTrimestres[T-1].arrDespeses"
												:columns="columnesDesp"
												row-key="empresa"
												separator="cell"
												dense
												:pagination="initialPagination"
												:rows-per-page-options="[0]"
												class="capsalera"
												hide-bottom
											/>

									</div>
									<div 
										class="col bg-white text-center"
										v-if="getArrDespesesDelsTrimestres[T-1].totalIVA != 0   ||
												  getObjIVACompensar[ T+'T' ] !=0 "
									>
										<q-card class="bg-yellow-3">
											Iva DEVENGAT ({{getArrQuadresTrimestres[T-1].totalIVA}}) 
											- Iva DEDUIBLE ({{getArrDespesesDelsTrimestres[T-1].totalIVA}}) 
											- Iva COMPENSAR ( {{ getObjIVACompensar[ T+"T" ]}} )= 
											{{ arrodonir( getArrQuadresTrimestres[T-1].totalIVA 
																		- getArrDespesesDelsTrimestres[T-1].totalIVA
																		- getObjIVACompensar[ T+"T" ], 2) }}
										</q-card>
									</div>
								</div>

							</div>
						</div>

					</q-card-section>
				</q-card>


		<div class="row justify-center q-gutter-md">
			<!-- <div class="col" v-for="(objTrim, index) in getArrQuadresTrimestres" :key="index"> -->


<!-- 
				<q-table
						v-for="(objTrim, index) in getArrQuadresTrimestres" :key="index"
						:title="'T' + objTrim.trimestre"
						:data="objTrim.resumFactures"
						:columns="columnes"
						row-key="fra"
						separator="cell"
						dense
						:pagination="initialPagination"
						:rows-per-page-options="[0]"
						class="capsalera"
						hide-bottom
					/>
 -->
			<!-- </div> -->
		</div>


		<div class="row justify-center q-mt-lg">

			<!-- <div class="col-3 q-ma-md"> -->
				<q-table
						title="Resum Anual"
						:data="getArrQuadresResumAnual"
						:columns="columnesResum"
						row-key="llogater"
						separator="cell"
						dense
						:pagination="initialPagination"
						:rows-per-page-options="[0]"
						class="capsalera"
						hide-bottom
					/>
			<!-- </div> -->

		</div>

	</div>
  
</template>

<script>
export default {
	created () {
		// console.log("getObjIVACompensar:", this.getObjIVACompensar())
		console.log("getArrDespesesDelsTrimestres:", this.getArrDespesesDelsTrimestres())
	},

	data(){
		return {
			columnes: [
				{	name: 'data', label: 'Data', field: 'data', classes: 'bg-grey-2 ellipsis', headerClasses: 'bg-grey-9 text-white text-center' },
				{	name: 'llogater', label: 'Llogater', field: 'llogater', classes: 'bg-grey-2 ellipsis', headerClasses: 'bg-grey-9 text-white text-center' },
				{	name: 'fra', label: 'Fra', field: 'numFra', classes: 'bg-grey-2 ellipsis', headerClasses: 'bg-grey-9 text-white text-center' },
				{	name: 'BI_IVA', label: 'BI_IVA', field: 'BI_IVA', classes: 'bg-grey-2 ellipsis', headerClasses: 'bg-grey-9 text-white text-center' },
				{	name: 'iva', label: 'IVA', field: 'IVA', classes: 'bg-grey-2 ellipsis', headerClasses: 'bg-grey-9 text-white text-center' },
			],


			columnesDesp: [
				{	name: 'data', label: 'Data', field: 'dataFra', classes: 'bg-grey-2 ellipsis', align:"center", headerClasses: 'bg-grey-9 text-white text-center' },
				// {	name: 'Factura', label: 'Factura', field: 'factura', classes: 'bg-grey-2 ellipsis', align:"center", headerClasses: 'bg-grey-9 text-white text-center' },
				{	name: 'empresa', label: 'empresa', field: 'empresa', classes: 'bg-grey-2 ellipsis', align:"left", headerClasses: 'bg-grey-9 text-white text-center' },
				// {	name: 'Concepte', label: 'Concepte', field: 'concepte', classes: 'bg-grey-2 ellipsis', align:"left", headerClasses: 'bg-grey-9 text-white text-center' },
				{	name: 'Import', label: 'Import', field: 'import', classes: 'bg-grey-2 ellipsis', headerClasses: 'bg-grey-9 text-white text-center' },
				{	name: 'p_IVA', label: 'p_IVA', field: 'p_IVA', classes: 'bg-grey-2 ellipsis', headerClasses: 'bg-grey-9 text-white text-center' },
				{	name: 'IVA', label: 'IVA', field: 'iva', classes: 'bg-grey-2 ellipsis', headerClasses: 'bg-grey-9 text-white text-center' },
				// {	name: 'ImportIVA', label: 'ImportIVA', field: 'importAmbIva', classes: 'bg-grey-2 ellipsis', headerClasses: 'bg-grey-9 text-white text-center' },
			],






			columnesResum: [
				{	name: 'llogater', label: 'Llogater', field: 'llogater', classes: 'bg-grey-2 ellipsis', headerClasses: 'bg-grey-9 text-white text-center' },
				{	name: 'cif', label: 'CIF', field: 'cif', classes: 'bg-grey-2 ellipsis', headerClasses: 'bg-grey-9 text-white text-center' },
				{	name: 'BI_IVA', label: 'BI_IVA', field: 'BI_IVA', classes: 'bg-grey-2 ellipsis', headerClasses: 'bg-grey-9 text-white text-center' },
				{	name: 'iva', label: 'IVA', field: 'IVA', classes: 'bg-grey-2 ellipsis', headerClasses: 'bg-grey-9 text-white text-center' },
			],

			
      initialPagination: {
        // sortBy: "desc",
        // descending: false,
        // page: 1,
        rowsPerPage: 0
      }

		}
	},

  computed: {

		getArrQuadresTrimestres() {
      return this.$store.getters["mImpostos/arrInfoPreparadaQuadresTrimestralsIVA_IRPF"] ;
		},
		getArrQuadresResumAnual() {
      return this.$store.getters["mImpostos/arrInfoPreparadaQuadreResumAnualImpostClient"]("IVA") ;
		},

		getObjIVACompensar() {
			console.log("==================")
			console.log(this.$store.getters["mImpostos/getObjIVAaCompensarMesAnterior"]);
      return this.$store.getters["mImpostos/getObjIVAaCompensarMesAnterior"] ;
		},

		getArrDespesesDelsTrimestres(){
			console.log("getArrDespesesDelTrimestre", this.$store.getters["mImpostos/arrResumDespesesIVA"])
			return this.$store.getters["mImpostos/arrResumDespesesIVA"] ;
			// return []
		}
		

	},

	methods: {
		arrodonir: function (value, decimals) {
			return Number(Math.round(value + "e" + decimals) + "e-" + decimals);
		}  
	}
	

}
</script>

<style lang="sass" scoped>
  .capsalera::v-deep

    /* height or max-height is important */
    // height: 350px

    .q-table__top
      /* bg color is important for th; just specify one */
      background-color: #f5d671

    // thead tr th
    //   position: sticky
    //   z-index: 1
    // thead tr:first-child th
    //   top: 0


    /* this is when the loading indicator appears */
    &.q-table--loading thead tr:last-child th
    //   /* height of all previous header rows */
    //   top: 20px





  tr:last-child >
    td 
      background-color: #f5d671
      font-weight: bold
  

</style>