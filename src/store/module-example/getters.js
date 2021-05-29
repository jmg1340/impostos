export function getArrAnys ( state ) {
    return state.arrActivitat.map( obj => obj.any )
}

export function getDiesAny ( state ) {
  const obj = state.arrActivitat.filter( objF => objF.any == state.anySeleccionat)[0]
  return (obj == undefined) ? null : obj.diesAny
}

export function getArrObjFactures ( state ) {
  const obj = state.arrActivitat.filter( objF => objF.any == state.anySeleccionat)[0]
  return (obj == undefined) ? [] : obj.facturacio
}

export function getArrObjDespeses( state ) {
  const obj = state.arrActivitat.filter( objD => objD.any == state.anySeleccionat)[0]
  return (obj == undefined) ? [] : obj.despeses
}



export function arrInfo(state, getters) {
    const arr = []
    getters.getArrObjFactures.forEach( objFactura => {
        // objLl.factures.forEach ( objFactura => {
           
        const objInfo = {}
            objInfo.nom = state.clients[objFactura.idClient].nom
            objInfo.idClient = objFactura.idClient
            objInfo.idImmoble = objFactura.idImmoble

            objInfo.trimestre = trimestre(objFactura.data)
            objInfo.data = objFactura.data
            objInfo.numFactura = objFactura.numero
            objInfo.IVA= round( items2(objFactura.items).reduce( (total, obj) => total += obj.importIva, 0 ) ,2)
            objInfo.IRPF= round( items2(objFactura.items).reduce( (total, obj) => total += obj.importIrpf, 0 ) ,2)
            objInfo.IMPORT= round( items2(objFactura.items).reduce( (total, obj) => total += obj.import1, 0 ) ,2)
            objInfo.BI_IVA= round( items2(objFactura.items).reduce( (total, obj) => total += (obj.p_iva == 0 ? 0 : obj.import1), 0) ,2)
            objInfo.BI_IRPF= round( items2(objFactura.items).reduce( (total, obj) => total += (obj.p_irpf == 0 ? 0 : obj.import1), 0),2) 
            
            arr.push(objInfo)
        // })
    })
    console.log(arr)
    return arr
}


export function arrInfoPreparadaQuadresTrimestralsIVA_IRPF(state, getters) {
  const arr = [];
  for (let trimestre = 1; trimestre < 5; trimestre++) {
    if (getters.arrInfo.some(objInfo => objInfo.trimestre === trimestre)) {
      let obj = {};
      obj.trimestre = trimestre;
      obj.resumFactures = getters.arrInfo
        .filter(objInfo2 => objInfo2.trimestre === trimestre)
        .map(objInfo3 => {
          return {
            data: objInfo3.data,
            llogater: objInfo3.nom,
            numFra: objInfo3.numFactura,
            IVA: objInfo3.IVA || null,
            IRPF: objInfo3.IRPF || null,
            IMPORT: objInfo3.IMPORT,
            BI_IVA: objInfo3.BI_IVA,
            BI_IRPF: objInfo3.BI_IRPF
          };
        });
      obj.resumFactures.push({
        data: null,
        llogater: null,
        numFra: "Total:",
        IRPF: round( getters.arrInfo
          .filter(objInfo2 => objInfo2.trimestre === trimestre)
          .reduce((total, objInfo3) => {
            return (total += objInfo3.IRPF);
          }, 0)  ,2),
        IVA: round( getters.arrInfo
          .filter(objInfo2 => objInfo2.trimestre === trimestre)
          .reduce((total, objInfo3) => {
            return (total += objInfo3.IVA || 0);
          }, 0)  ,2),
          IMPORT: round( getters.arrInfo
          .filter(objInfo2 => objInfo2.trimestre === trimestre)
          .reduce((total, objInfo3) => {
            return (total += objInfo3.IMPORT);
          }, 0)  ,2),
          BI_IVA: round( getters.arrInfo
          .filter(objInfo2 => objInfo2.trimestre === trimestre)
          .reduce((total, objInfo3) => {
            return (total += objInfo3.BI_IVA);
          }, 0)  ,2),
          BI_IRPF: round( getters.arrInfo
          .filter(objInfo2 => objInfo2.trimestre === trimestre)
          .reduce((total, objInfo3) => {
            return (total += objInfo3.BI_IRPF);
          }, 0)  ,2)
      });

      arr.push(obj);
    }
  }

  console.log(arr);
  return arr;
}



export function arrInfoPreparadaQuadreResumAnualImpostClient ( state, getters ) { 
  return function(impost) {  
    const arr = []
    getters.arrIdClients.forEach ( id => {

      let obj = {}
      obj.llogater = state.clients[id].nom
      obj.cif = state.clients[id].CIF
      obj[impost] = round( getters.arrInfo.filter ( objInfo2  => objInfo2.idClient === id)
                      .reduce( (total, objInfo3) => {
                        return total += objInfo3[impost]
                      }, 0)  ,2)
      obj.BI_IVA = round( getters.arrInfo.filter ( objInfo2  => objInfo2.idClient === id)
                      .reduce( (total, objInfo3) => {
                        return total += objInfo3.BI_IVA
                      }, 0)  ,2)
      obj.BI_IRPF = round( getters.arrInfo.filter ( objInfo2  => objInfo2.idClient === id)
                      .reduce( (total, objInfo3) => {
                        return total += objInfo3.BI_IRPF
                      }, 0)  ,2)
      arr.push(obj)
    })

    arr.push ({
      llogater : "Total:",
      [impost] : round( getters.arrInfo.reduce( (total, objInfo3) => {
                        return total += objInfo3[impost]
                      }, 0)
                      , 2),
      BI_IVA : round( getters.arrInfo.reduce( (total, objInfo3) => {
                        return total += objInfo3.BI_IVA
                      }, 0)
                      , 2),
      BI_IRPF : round( getters.arrInfo.reduce( (total, objInfo3) => {
                        return total += objInfo3.BI_IRPF
                      }, 0)
                      , 2)
    })

    console.log(arr)
    return arr
  }


}



export function arrInfoPreparadaQuadreResumAnualImpostImmoble ( state, getters ) { 
  return function(impost) {  
    const arr = []
    getters.arrIdImmobles.forEach ( id => {

      let obj = {}
      obj.immoble = state.immobles[id].ubicacio
      obj[impost] = round( getters.arrInfo.filter ( objInfo2  => objInfo2.idImmoble === id)
                      .reduce( (total, objInfo3) => {
                        return total += objInfo3[impost]
                      }, 0)  ,2)
      obj.BI_IVA = round( getters.arrInfo.filter ( objInfo2  => objInfo2.idImmoble === id)
                      .reduce( (total, objInfo3) => {
                        return total += objInfo3.BI_IVA
                      }, 0)  ,2)
      obj.BI_IRPF = round( getters.arrInfo.filter ( objInfo2  => objInfo2.idImmoble === id)
                      .reduce( (total, objInfo3) => {
                        return total += objInfo3.BI_IRPF
                      }, 0)  ,2)
      arr.push(obj)
    })

    arr.push ({
      llogater : "Total:",
      [impost] : round( getters.arrInfo.reduce( (total, objInfo3) => {
                        return total += objInfo3[impost]
                      }, 0)
                      , 2),
      BI_IVA : round( getters.arrInfo.reduce( (total, objInfo3) => {
                        return total += objInfo3.BI_IVA
                      }, 0)
                      , 2),
      BI_IRPF : round( getters.arrInfo.reduce( (total, objInfo3) => {
                        return total += objInfo3.BI_IRPF
                      }, 0)
                      , 2)
    })

    console.log(arr)
    return arr
  }


}


export function arrFitxesImmobles( state, getters ) { 
  // return function(impost) {  
    const diesAny = getters.getDiesAny
    const arr = []
    Object.keys(getters.getArrObjDespeses).forEach ( id => {

      let obj = {}
      obj.immoble = state.immobles[id].ubicacio
      obj.RC = state.immobles[id].RC
      obj.diesLloguer= getters.getArrObjDespeses[id].diesLloguer
      obj.diesDisposicio= getters.getArrObjDespeses[id].diesDisposicio
      obj.percPropietat= getters.getArrObjDespeses[id].percPropietat
      obj.percValCadast = getters.getArrObjDespeses[id].percValCadast
      obj.IRPF_indiv = round( getters.arrInfo.filter ( objInfo2  => objInfo2.idImmoble === id)
                      .reduce( (total, objInfo3) => {
                        return total += objInfo3.IRPF
                      }, 0)  ,2)
      obj.BI_IRPF_indiv = round( getters.arrInfo.filter ( objInfo2  => objInfo2.idImmoble === id)
                      .reduce( (total, objInfo3) => {
                        return total += objInfo3.BI_IRPF
                      }, 0)  ,2)


      

      // ------- DADES TOTALS ----

      obj.despComunit_total = getters.getArrObjDespeses[id].despComunit
      obj.despConservacio_total = getters.getArrObjDespeses[id].despConservacio
      obj.IBI_total = getters.getArrObjDespeses[id].tributs.IBI
      obj.Escombreries_total = getters.getArrObjDespeses[id].tributs.Escombreries
      
      obj.sumaTributs_total = round(obj.IBI_total + obj.Escombreries_total, 2)

      obj.valorCadastral_total = getters.getArrObjDespeses[id].valorCadastral
      obj.valorEdificacio_total = getters.getArrObjDespeses[id].valorEdificacio
      obj.percAmortitzacio = getters.getArrObjDespeses[id].percAmortitzacio
      obj.Amortitzacio_total = round( getters.getArrObjDespeses[id].percAmortitzacio *
                               getters.getArrObjDespeses[id].valorEdificacio ,2)
      obj.RendADisposicio_total = round( getters.getArrObjDespeses[id].percValCadast *
                               getters.getArrObjDespeses[id].valorCadastral ,2)

      obj.dataAdquisicio = state.immobles[id].DataAdquisicio
      obj.valorAdquisicio_total = state.immobles[id].valorAdquisicio
      obj.DespesesTributsAdquisicio_total = state.immobles[id].DespesesTributsAdquisicio





      // ------- DADES INDIVIDUALS ----

      obj.despComunit_indiv = round(obj.despComunit_total  * obj.percPropietat, 2)
      obj.despComunit_indiv_prorrateig = round(obj.despComunit_indiv * obj.diesLloguer / diesAny, 2)
      
      obj.despConservacio_indiv = round( obj.despConservacio_total * obj.percPropietat, 2)

      obj.IBI_indiv = round(obj.IBI_total * obj.percPropietat, 2)
      obj.Escombreries_indiv = round(obj.Escombreries_total * obj.percPropietat, 2)

      obj.sumaTributs_indiv = round( obj.IBI_indiv + obj.Escombreries_indiv, 2)
      obj.sumaTributs_indiv_prorrateig = round(obj.sumaTributs_indiv * obj.diesLloguer / diesAny, 2)

      obj.valorCadastral_indiv = round(obj.valorCadastral_total * obj.percPropietat, 2)
      obj.valorEdificacio_indiv = round(obj.valorEdificacio_total * obj.percPropietat, 2)
      obj.Amortitzacio_indiv = round(obj.Amortitzacio_total * obj.percPropietat, 2)
      obj.Amortitzacio_indiv_prorrateig = round(obj.Amortitzacio_indiv * obj.diesLloguer / diesAny, 2)
      obj.RendADisposicio_indiv = round(obj.RendADisposicio_total * obj.percPropietat, 2)
      obj.RendADisposicio_indiv_prorrateig = round(obj.RendADisposicio_indiv * obj.diesDisposicio / diesAny, 2)

      obj.valorAdquisicio_indiv = round(obj.valorAdquisicio_total * obj.percPropietat, 2)
      obj.DespesesTributsAdquisicio_indiv = round( obj.DespesesTributsAdquisicio_total * obj.percPropietat, 2)


      arr.push(obj)
    })

    console.log(arr)
    return arr
  // }


}



export function arrIdClients ( state, getters) {
  return [...new Set(getters.getArrObjFactures.map(obj => obj.idClient))];
}

export function arrIdImmobles ( state, getters) {
  return [...new Set(getters.getArrObjFactures.map(obj => obj.idImmoble))];
}


function trimestre(data){
  var parts = data.split("/");
  var month = parts[1]; // console.log('El valor del mes es: '+month);
  var trimestre = Math.floor((month-1)/3)+1;
  return trimestre;
}

function items2( items ) {
  return items.map( obj => {
    obj.importIva = round(obj.import1 * obj.p_iva, 2),
    obj.importIrpf = round(obj.import1 * obj.p_irpf, 2)
    return obj
  })			
}

function round (value, decimals) {
  return Number(Math.round(value + "e" + decimals) + "e-" + decimals);
}  

