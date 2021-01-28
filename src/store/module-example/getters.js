export function getArrAnys ( state ) {
    return state.arrFacturacio.map( objF => objF.any )
}

export function getArrObjLlogaters ( state ) {
    const obj = state.arrFacturacio.filter( objF => objF.any == state.anySeleccionat)[0]
    return (obj == undefined) ? [] : obj.llogaters
}



export function arrInfo(state, getters) {
    const arr = []
    getters.getArrObjLlogaters.forEach( objLl => {
        objLl.factures.forEach ( objFactura => {
            const objInfo = {}
            objInfo.nom = objLl.nom

            objInfo.trimestre = trimestre(objFactura.data)
            objInfo.data = objFactura.data
            objInfo.numFactura = objFactura.numero
            objInfo.IVA= items2(objFactura.items).reduce( (total, obj) => total += obj.importIva, 0 ), 
            objInfo.IRPF= items2(objFactura.items).reduce( (total, obj) => total += obj.importIrpf, 0 ), 
            objInfo.IMPORT= items2(objFactura.items).reduce( (total, obj) => total += obj.import1, 0 )
            objInfo.BI_IVA= items2(objFactura.items).reduce( (total, obj) => total += (obj.p_iva == 0 ? 0 : obj.import1), 0 )
            objInfo.BI_IRPF= items2(objFactura.items).reduce( (total, obj) => total += (obj.p_irpf == 0 ? 0 : obj.import1), 0 )
            
            arr.push(objInfo)
        })
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
        IRPF: getters.arrInfo
          .filter(objInfo2 => objInfo2.trimestre === trimestre)
          .reduce((total, objInfo3) => {
            return (total += objInfo3.IRPF);
          }, 0),
        IVA: getters.arrInfo
          .filter(objInfo2 => objInfo2.trimestre === trimestre)
          .reduce((total, objInfo3) => {
            return (total += objInfo3.IVA || 0);
          }, 0),
        IMPORT: getters.arrInfo
          .filter(objInfo2 => objInfo2.trimestre === trimestre)
          .reduce((total, objInfo3) => {
            return (total += objInfo3.IMPORT);
          }, 0)
      });

      arr.push(obj);
    }
  }

  console.log(arr);
  return arr;
}



export function arrInfoPreparadaQuadreResumAnual ( state, getters ) { 
  return function(impost) {  
    const arr = []
    getters.arrNomsLlogaters.forEach ( nom => {
      if (getters.arrInfo.filter( objInfo => objInfo.nom === nom)) {
        let obj = {}
        obj.llogater = nom
        obj[impost] = getters.arrInfo.filter ( objInfo2  => objInfo2.nom === nom)
                        .reduce( (total, objInfo3) => {
                          return total += objInfo3[impost]
                        }, 0)
        obj.["BI_"+impost] = getters.arrInfo.filter ( objInfo2  => objInfo2.nom === nom)
                        .reduce( (total, objInfo3) => {
                          return total += objInfo3["BI_"+impost]
                        }, 0)
        arr.push(obj)

      }
    })

    arr.push ({
      llogater : "Total:",
      [impost] : getters.arrInfo.reduce( (total, objInfo3) => {
                        return total += objInfo3[impost]
                      }, 0),
      IMPORT : getters.arrInfo.reduce( (total, objInfo3) => {
                        return total += objInfo3.IMPORT
                      }, 0)
    })

    console.log(arr)
    return arr
  }
}


export function arrNomsLlogaters ( state, getters) {
  return [...new Set(getters.getArrObjLlogaters.map(obj => obj.nom))];
}


function trimestre(data){
  var parts = data.split("/");
  var month = parts[1]; // console.log('El valor del mes es: '+month);
  var trimestre = Math.floor((month-1)/3)+1;
  return trimestre;
}

function items2( items ) {
  return items.map( obj => {
    obj.importIva = obj.import1 * obj.p_iva,
    obj.importIrpf = obj.import1 * obj.p_irpf
    return obj
  })			
}
