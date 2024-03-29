import objActivitat2018 from "../../dades/activitat2018.json";
import objActivitat2019 from "../../dades/activitat2019.json";
import objActivitat2020 from "../../dades/activitat2020.json";
import objActivitat2021 from "../../dades/activitat2021.json";
import objActivitat2022 from "../../dades/activitat2022.json";

export default function() {
  return {
    anySeleccionat: null,

    arrActivitat: [
      objActivitat2022,
      objActivitat2021,
      objActivitat2020,
      objActivitat2019,
      objActivitat2018
    ],

    immobles: {
      GC26: {
        RC: "3227701CF5532E0003UO",
        ubicacio: "Gral Contreras, 26",
        DataAdquisicio: "01/04985",
        valorAdquisicio: 5500, // RiJ
        DespesesTributsAdquisicio: 550 // RiJ
      },

      GC28: {
        RC: "32277002CF5532E0001FU",
        ubicacio: "Gral Contreras, 28",
        DataAdquisicio: "01/04/1985",
        valorAdquisicio: 6600, //  RiJ
        DespesesTributsAdquisicio: 660 //  RiJ
      },

      PI41: {
        RC: "3530714CF5532H0001WA",
        ubicacio: "Pons d'Icart, 41",
        DataAdquisicio: "01/04/1985",
        valorAdquisicio: 12500, // RiJ
        DespesesTributsAdquisicio: 1250 // RiJ
      },

      CLFT: {
        RC: "8026501CF1372S0070YP",
        ubicacio: "Marina St. Jordi",
        DataAdquisicio: "?",
        valorAdquisicio: 0,
        DespesesTributsAdquisicio: 0
      },

      PKNG1: {
        RC: "0218801DF2901G0112BR",
        ubicacio: "Parking cotxe nens",
        DataAdquisicio: "?",
        valorAdquisicio: 0,
        DespesesTributsAdquisicio: 0
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
  };
}
