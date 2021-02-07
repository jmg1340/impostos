import objActivitat2019 from "../../dades/activitat2019.json"
import objActivitat2020 from "../../dades/activitat2020.json"
import objFacturacio2021 from "../../dades/facturacio2021.json"


export default function () {
  return {
    anySeleccionat: null,
    
    arrActivitat: [
      objActivitat2019,
      objActivitat2020,
      // objFacturacio2021,
    ],

    immobles: {
      GC26: {
        RC: "3227701CF5532E0003UO",
        ubicacio: "Gral Contreras, 26",
        DataAdquisicio: "01/04/1985",
        valorAdquisicio: 5500,   // RiJ
        DespesesTributsAdquisicio: 550    // RiJ
      },

      GC28: {
        RC: "32277002CF5532E0001FU",
        ubicacio: "Gral Contreras, 28",
        DataAdquisicio: "01/04/1985",
        valorAdquisicio: 6600,  //  RiJ
        DespesesTributsAdquisicio: 660    //  RiJ
      },

      PI41: {
        RC: "3530714CF5532H0001WA",
        ubicacio: "Pons d'Icart, 41",
        DataAdquisicio: "01/04/1985",
        valorAdquisicio: 12500,   // RiJ
        DespesesTributsAdquisicio: 1250  // RiJ
      }
    },


    clients: {
      NAY: {
        CIF: "B55671275",
        nom: "Limpiezas Ayur SL"
      },
      TGNR: {
        CIF: "B55623177",
        nom: "TGN Rentals SL"        
      }
    }

  }
}
