import objFacturacio2020 from "../../dades/facturacio2020.json"
import objFacturacio2021 from "../../dades/facturacio2021.json"


export default function () {
  return {
    anySeleccionat: null,
    
    arrFacturacio: [
      objFacturacio2020,
      objFacturacio2021,
    ]

  }
}
