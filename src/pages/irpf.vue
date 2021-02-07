<template>
	<div class="column q-ma-md">
		<div class="col text-h5 text-center">RESUM IRPF</div>
		
		<!-- <div class="row q-gutter-md">
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
		</div> -->


		<!-- <div class="row">
			<div class="col-auto q-ma-md">
				<q-table
						title="Resum IRPF (individual)"
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
		</div> -->

	
		<div class="col">
			<q-card v-for="(fitxa, index) in arrFitxesImmobles" :key="index" class="q-ma-md">
				<q-card-section>
					<div class="text-center text-h6 bg-amber-11">{{ fitxa.immoble}}	- [ Ref.Cad.: {{ fitxa.RC }} ]</div>
				</q-card-section>
				<q-card-section>
					<div class="row">
						<div class="col-2">
							<div class=" text-bold">Ingressos i retencions	</div>
							<div class="col">
								<ul>
									<li>BI: <span class="text-bold text-indigo-10">{{ fitxa.BI_IRPF_indiv}} </span></li>
									<li>Retenció: <span class="text-bold text-red">{{ fitxa.IRPF_indiv}} </span></li>
								</ul>
							</div>

							<div class="col q-mt-lg">
								<div class="col">
									Dies de lloguer: {{ fitxa.diesLloguer }} <span class="text-grey"> de 365</span>
								</div>
								<div class="col">
									Dies a disposició: {{ 365 - fitxa.diesLloguer }} <span class="text-grey"> de 365</span>
								</div>
							</div>



						</div>

						<div class="col">

							<div class="column ">
								<div class="column items-center">
								</div>								
								
								<div class="row">

									<div class="col text-grey">
										<div class=" text-bold">Despeses TOTALS</div>
											<ul>
												<li>Desp. comunitaries: <span class="text-bold">{{ fitxa.despComunit_total}}</span></li>
												<li>Desp. conservacio: <span class="text-bold">{{ fitxa.despConservacio_total}}</span></li>
												<li>Suma tributs: <span class="text-bold"> {{ fitxa.sumaTributs_total }} </span></li>
												<ul class="q-mb-md">
                          <li>IBI: <span class="">{{ fitxa.IBI_total}}</span></li>
                          <li>Escombreries: <span class="">{{ fitxa.Escombreries_total}}</span></li>
											  </ul>
											</ul>
											<!-- <div class="text-center">TOTAL: {{ fitxa.sumaTributs_total}} * ( {{ fitxa.diesLloguer }} / 365 ) = 
												<span class="text-bold"> {{ round(fitxa.sumaTributs_total * fitxa.diesLloguer / 365, 2) }} </span></div> -->
											<!-- <q-separator/> -->
											<ul>
												<li>Valor Cadastral: <span class="text-bold">{{ fitxa.valorCadastral_total}}</span></li>
												<li>Valor Cadastral (edif): <span class="text-bold">{{ fitxa.valorEdificacio_total}}</span></li>
												<li>Amortització: {{ fitxa.Amortitzacio_total}} </li>
                        <ul class="q-mb-md">
                          <li> {{ fitxa.valorEdificacio_total}} *  {{ fitxa.percAmortitzacio * 100}}%</li>
                        </ul>
                        <li>Data adquisicio: {{ fitxa.dataAdquisicio }} </li>
                        <li>Valor adquisicio: {{ fitxa.valorAdquisicio_total }} </li>
                        <li>Despeses adquisicio: {{ fitxa.DespesesTributsAdquisicio_total }} </li>
											</ul>
									</div>

									<div class="col">
										<div class=" text-bold">Despeses INDIVIDUALS</div>
											<ul>
												<li>Desp. comunitaries: {{ fitxa.despComunit_indiv}} * ( {{ fitxa.diesLloguer }} / 365 ) = <span class="text-bold text-red">{{ fitxa.despComunit_indiv_prorrateig}}</span></li>
												<li>Desp. conservacio: <span class="text-bold text-red">{{ fitxa.despConservacio_indiv}}</span></li>
												<li>Suma tributs: {{ fitxa.sumaTributs_indiv}} * ( {{ fitxa.diesLloguer }} / 365 ) = 
												<span class="text-bold text-red"> {{ fitxa.sumaTributs_indiv_prorrateig }} </span></li>
												<ul class="q-mb-md">
                          <li>IBI: <span class="text-bold">{{ fitxa.IBI_indiv}}</span></li>
                          <li>Escombreries: <span class="text-bold">{{ fitxa.Escombreries_indiv}}</span></li>
                        </ul>
											</ul>

											<ul>
												<li>Valor Cadastral: <span class="text-bold text-red">{{ fitxa.valorCadastral_indiv}}</span></li>
												<li>Valor Cadastral (edif): <span class="text-bold text-red">{{ fitxa.valorEdificacio_indiv}}</span></li>
												<li>Amortització: {{ fitxa.Amortitzacio_indiv}} * ( {{ fitxa.diesLloguer }} / 365 ) = 
												<span class="text-bold text-red"> {{ fitxa.Amortitzacio_indiv_prorrateig }} </span></li>
                        <ul class="q-mb-md">
                          <li> {{ fitxa.valorEdificacio_indiv}} *  {{ fitxa.percAmortitzacio * 100}}%</li>
                        </ul>
                        <li>Data adquisicio: <span class="text-bold text-red"> {{ fitxa.dataAdquisicio }} </span> </li>
                        <li>Valor adquisicio: <span class="text-bold text-red"> {{ fitxa.valorAdquisicio_indiv }} </span></li>
                        <li>Despeses adquisicio: <span class="text-bold text-red"> {{ fitxa.DespesesTributsAdquisicio_indiv }} </span></li>
											</ul>
									</div>


								</div>
							</div>

						</div>


						<div class="col-2">
							<div class="column">
								<div class="col text-bold">RENDIMENT NET</div>
								<div class="col">
									<div>BI: <span class="text-indigo-10">{{ fitxa.BI_IRPF_indiv }}</span> </div>
									<div>Desp. Comunit.: <span class="text-red">- {{ fitxa.despComunit_indiv_prorrateig }}</span> </div>
									<div>Desp. Conservacio.: <span class="text-red">- {{ fitxa.despConservacio_indiv }}</span> </div>
									<div>Suma tributs: <span class="text-red">- {{ fitxa.sumaTributs_indiv_prorrateig }}</span> </div>
									<div>Amortització: <span class="text-red"> - {{ fitxa.Amortitzacio_indiv_prorrateig }}</span> </div>
									<q-separator class="q-mb-md"/>
									<div>REND. NET: <span class="text-bold text-white bg-indigo-10 q-pa-xs">
                    {{ round( fitxa.BI_IRPF_indiv - fitxa.despComunit_indiv_prorrateig - fitxa.despConservacio_indiv - fitxa.sumaTributs_indiv_prorrateig  -  fitxa.Amortitzacio_indiv_prorrateig, 2) }}</span> </div>
								</div>
							</div>
						</div>
						 

					</div>
				</q-card-section>
			</q-card>
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
				{	name: 'BI_IRPF', label: 'BI_IRPF', field: 'BI_IRPF', classes: 'bg-grey-2 ellipsis', headerClasses: 'bg-grey-9 text-white text-center' },
				{	name: 'irpf', label: 'IRPF', field: 'IRPF', classes: 'bg-grey-2 ellipsis', headerClasses: 'bg-grey-9 text-white text-center' },
			],

			columnesResum: [
				{	name: 'immoble', label: 'IMMOBLE', field: 'immoble', classes: 'bg-grey-2 ellipsis', headerClasses: 'bg-grey-9 text-white text-center' },
				{	name: 'BI_IRPF', label: 'BI', field: 'BI_IRPF', classes: 'bg-grey-2 ellipsis', headerClasses: 'bg-grey-9 text-white text-center' },
				{	name: 'irpf', label: 'IRPF', field: 'IRPF', classes: 'bg-grey-2 ellipsis', headerClasses: 'bg-grey-9 text-white text-center' },
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

		// getArrQuadresTrimestres() {
    //   return this.$store.getters["mImpostos/arrInfoPreparadaQuadresTrimestralsIVA_IRPF"] ;
		// },
		getArrQuadresResumAnual() {
      return this.$store.getters["mImpostos/arrInfoPreparadaQuadreResumAnualImpostImmoble"]("IRPF") ;
		},
		arrFitxesImmobles() {
      return this.$store.getters["mImpostos/arrFitxesImmobles"];
		},

	},

	methods: {
		round (value, decimals) {
			return Number(Math.round(value + "e" + decimals) + "e-" + decimals);
		}  

	}
	

}
</script>

<style lang="sass" scoped>
  .capsalera::v-deep

    /* height or max-height is important */
    // height: 300px

    .q-table__top
      /* bg color is important for th; just specify one */
      background-color: #f5d671

    // thead tr th
    //   position: sticky
    //   z-index: 1
    // thead tr:first-child th
    //   top: 0


    /* this is when the loading indicator appears */
    // &.q-table--loading thead tr:last-child th
    //   /* height of all previous header rows */
    //   top: 20px





  tr:last-child >
    td 
      background-color: #f5d671
      font-weight: bold
  

</style>