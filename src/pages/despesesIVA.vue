<template>
  <div class="q-ma-md">

				<q-table
						title="Despeses IVA deduible de tot l'any"
						:data="getDespesesIva"
						:columns="columnes"
						row-key="dataFra"
						separator="cell"
						dense
						:pagination="initialPagination"
						:rows-per-page-options="[0]"
						class="capsalera"
						hide-bottom
					/>



  </div>
</template>

<script>
export default {
	data(){
		return {
			columnes: [
				{	name: 'data', label: 'Data', field: 'dataFra', classes: 'bg-grey-2 ellipsis', align:"center", headerClasses: 'bg-grey-9 text-white text-center', sortable: true },
				{	name: 'Factura', label: 'Factura', field: 'factura', classes: 'bg-grey-2 ellipsis', align:"center", headerClasses: 'bg-grey-9 text-white text-center' },
				{	name: 'empresa', label: 'empresa', field: 'empresa', classes: 'bg-grey-2 ellipsis', align:"left", headerClasses: 'bg-grey-9 text-white text-center' },
				{	name: 'Concepte', label: 'Concepte', field: 'concepte', classes: 'bg-grey-2 ellipsis', align:"left", headerClasses: 'bg-grey-9 text-white text-center' },
				{	name: 'Import', label: 'Import', field: 'import', classes: 'bg-grey-2 ellipsis', headerClasses: 'bg-grey-9 text-white text-center' },
				{	name: 'p_IVA', label: 'p_IVA', field: 'p_IVA', classes: 'bg-grey-2 ellipsis', headerClasses: 'bg-grey-9 text-white text-center' },
				{	name: 'IVA', label: 'IVA', field: 'iva', classes: 'bg-grey-2 ellipsis', headerClasses: 'bg-grey-9 text-white text-center' },
				{	name: 'ImportIVA', label: 'ImportIVA', field: 'importAmbIva', classes: 'bg-grey-2 ellipsis', headerClasses: 'bg-grey-9 text-white text-center' },
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
		getDespesesIva () {
			console.log("imImpostos/getArrDespesesIVA", this.$store.getters["mImpostos/getArrDespesesIVA"] )
			return this.$store.getters["mImpostos/getArrObjDespesesIVA"] ;
		}
	}
}
</script>

<style>

</style>