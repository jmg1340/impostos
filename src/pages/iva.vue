<template>
	<div class="column q-ma-md">
		<div class="col text-h5 text-center">RESUM IVA</div>
		
		<div class="row q-gutter-md">
			<div class="col" v-for="(objTrim, index) in getArrQuadresTrimestres" :key="index">

				<q-table
						:title="'T' + objTrim.trimestre"
						:data="objTrim.resumFactures"
						:columns="columnes"
						row-key="fra"
						separator="cell"
						dense
						:pagination="initialPagination"
						:rows-per-page-options="[0]"
						class="capsalera"
					/>

			</div>
		</div>


		<div class="row">

			<div class="col-3 q-ma-md">
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
					/>
			</div>

		</div>

	</div>
  
</template>

<script>
export default {
	data(){
		return {
			columnes: [
				{	name: 'data', label: 'Data', field: 'data', classes: 'bg-grey-2 ellipsis', headerClasses: 'bg-grey-9 text-white text-center' },
				{	name: 'llogater', label: 'Llogater', field: 'llogater', classes: 'bg-grey-2 ellipsis', headerClasses: 'bg-grey-9 text-white text-center' },
				{	name: 'fra', label: 'Fra', field: 'numFra', classes: 'bg-grey-2 ellipsis', headerClasses: 'bg-grey-9 text-white text-center' },
				{	name: 'BI_IVA', label: 'BI_IVA', field: 'BI_IVA', classes: 'bg-grey-2 ellipsis', headerClasses: 'bg-grey-9 text-white text-center' },
				{	name: 'iva', label: 'IVA', field: 'IVA', classes: 'bg-grey-2 ellipsis', headerClasses: 'bg-grey-9 text-white text-center' },
			],

			columnesResum: [
				{	name: 'llogater', label: 'Llogater', field: 'llogater', classes: 'bg-grey-2 ellipsis', headerClasses: 'bg-grey-9 text-white text-center' },
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
      return this.$store.getters["mImpostos/arrInfoPreparadaQuadreResumAnual"]("IVA") ;
		},


	},

	methods: {
	}
	

}
</script>

<style lang="sass" scoped>
  .capsalera::v-deep

    /* height or max-height is important */
    height: 300px

    .q-table__top
      /* bg color is important for th; just specify one */
      background-color: #f5d671

    thead tr th
      position: sticky
      z-index: 1
    thead tr:first-child th
      top: 0


    /* this is when the loading indicator appears */
    &.q-table--loading thead tr:last-child th
      /* height of all previous header rows */
      top: 20px





  tr:last-child >
    td 
      background-color: #f5d671
      font-weight: bold
  

</style>