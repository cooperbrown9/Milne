
import * as ConversionActions from '../action-types/conversion-action-types';
import data from '../../../assets/charts/brix-data.json';


const initialState = {
  fromBrix: 0.0, toBrix: 0.0,
  startingMetrics: {
    brix: 0.0,
    lbsPerGal: 0.0,
    solidLbsPerGal: 0.0,
    kgPerGal: 0.0,
    solidLbsPerMetricTon: 0.0,
    totalGallonspermetricTon: 0.0
  },
  dilutedMetrics: {
    brix: 0.0,
    lbsPerGal: 0.0,
    solidLbsPerGal: 0.0,
    kgPerGal: 0.0,
    solidLbsPerMetricTon: 0.0,
    totalGallonspermetricTon: 0.0
  }
}

export default function conversion(state = initialState, action) {
  switch(action.type) {

    case ConversionActions.DILUTION_METRICS:
      for(let i = 0; i < data.length; i++) {
        if(data[i].brix == action.toBrix) {
          return {
            ...state,
            toBrix: action.toBrix,
            dilutedMetrics: data[i]
          }
        }
      }

    case ConversionActions.STARTING_METRICS:
      for(let i = 0; i < data.length; i++) {
        if(data[i].brix == action.fromBrix) {
          return {
            ...state,
            fromBrix: action.fromBrix,
            startingMetrics: data[i]
          }
        }
      }

    case ConversionActions.DILUTE_WEIGHT_TO_VOLUME:
      const STARTING_CONCENTRATE = 100;
      const WATER_POUNDS_PER_GAL = 8.35;
      let totalPoundsProduct = action.fromBrix / (action.toBrix / STARTING_CONCENTRATE);
      let totalPoundsWater = totalPoundsProduct - STARTING_CONCENTRATE;
      let galsOfWater = totalPoundsWater / WATER_POUNDS_PER_GAL;
      let galsOfProduct = STARTING_CONCENTRATE / state.startingMetrics.lbsPerGal;

      return {
          ...state,
          dilutionRate: galsOfProduct
      }

    default:
      return state;

  }
}

// CONVERT DILUTION WEIGHT to VOLUME:
// startingproduct:   pounds=100 always
// let totalPoundsOfProduct = STARTINGBRIX / (toBrix / 100) == total pounds for formula
// so, totalPoundsOfProduct - 100 = pounds of water
// then convert poundsOfProduct and poundsOfWater to gallons
// then, take percentages of them and thats how much of each
// to dilute from startBrix to diluteBrix, use the formula by weight:
//  startingProduct: galsOfProductPercentage, water: galsWaterPercentage
