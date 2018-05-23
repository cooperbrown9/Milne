
import * as ConversionActions from '../action-types/conversion-action-types';
import data from '../../../assets/charts/brix-data.json';


const initialState = {
  fromBrix: 0.0, toBrix: 0.0,
  waterPerc: 0.0, productPerc: 0.0,
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
    totalGallonspermetricTon: 0.0,
    waterPerc: 0.0,
    productPerc: 0.0
  },
  cost: {
    price: 10.00,
    perLB: 0.0,
    perKG: 0.0,
    perGal: 0.0,
    perMetricTon: 0.0,
    perLBSolid: 0.0
  }
}

export default function conversion(state = initialState, action) {
  switch(action.type) {

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

    // user input is cost per gallon
    case ConversionActions.COST_BY_GALLON:
      return {
        ...state,
        cost: {
          ...state.cost, 
          price: action.price,
          perGal: action.price,
          perLB: action.price / state.startingMetrics.lbsPerGal,
          perKG: action.price / state.startingMetrics.kgPerGal,
          perMetricTon: action.price * state.startingMetrics.totalGallonspermetricTon,
          perLBSolid: action.price / state.startingMetrics.solidLbsPerGal
        }
      }

    case ConversionActions.COST_BY_POUND:
      return {
        ...state,
        cost: {
          ...state.cost,
          price: action.price,
          perLB: action.price,
          perKG: action.price * state.startingMetrics.lbsPerGal / state.startingMetrics.kgPerGal,
          perGal: action.price * state.startingMetrics.lbsPerGal,
          perMetricTon: action.price * state.startingMetrics.lbsPerGal * state.startingMetrics.totalGallonspermetricTon,
          perLBSolid: action.price * state.startingMetrics.lbsPerGal / state.startingMetrics.solidLbsPerGal
        }
      }

    case ConversionActions.COST_BY_KG:
      return {
        ...state,
        cost: {
          ...state.cost,
          price: action.price,
          perKG: action.price,
          perGal: action.price * state.startingMetrics.kgPerGal,
          perLB: action.price * state.startingMetrics.kgPerGal / state.startingMetrics.lbsPerGal,
          perMetricTon: action.price * state.startingMetrics.kgPerGal * state.startingMetrics.totalGallonspermetricTon,
          perLBSolid: action.price * state.startingMetrics.kgPerGal / state.startingMetrics.solidLbsPerGal
        }
      }

    case ConversionActions.COST_BY_TON:
      return {
        ...state,
        cost: {
          ...state.cost,
          price: action.price,
          perMetricTon: action.price,
          perLB: action.price / state.startingMetrics.totalGallonspermetricTon / state.startingMetrics.lbsPerGal,
          perGal: action.price / state.startingMetrics.totalGallonspermetricTon,
          perKG: action.price  / state.startingMetrics.totalGallonspermetricTon / state.startingMetrics.kgPerGal,
          perLBSolid: action.price / state.startingMetrics.totalGallonspermetricTon / state.startingMetrics.solidLbsPerGal
        }
      }

    case ConversionActions.VOLUME_TO_WEIGHT:
      for(let i = 0; i < data.length; i++) {
        if(data[i].brix == state.fromBrix) {
          return {
            ...state,
            // fromBrix: action.fromBrix,
            dilutedMetrics: data[i]
          }
        }
      }

    // make state.dilutionbuttonon so when button is clicked it changes brix and dispatches
    case ConversionActions.DILUTE_WEIGHT_TO_VOLUME:
      const STARTING_CONCENTRATE = 100;
      let WATER_POUNDS_PER_GAL = 8.35;
      let totalPoundsProduct = action.fromBrix / (action.toBrix / STARTING_CONCENTRATE);
      let totalPoundsWater = totalPoundsProduct - STARTING_CONCENTRATE;
      let galsOfWater = totalPoundsWater / WATER_POUNDS_PER_GAL;
      let galsOfProduct = STARTING_CONCENTRATE / state.startingMetrics.lbsPerGal;

      let totalGals = galsOfWater + galsOfProduct;
      let galsOfWaterPerc = galsOfWater / totalGals;
      let galsOfProdPerc = galsOfProduct / totalGals;

      if(galsOfWaterPerc == NaN) {
        galsOfWaterPerc = 0.0;
      }

      if(galsOfProdPerc == NaN) {
        galsOfProdPerc = 0.0;
      }

      return {
          ...state,
          dilutionRate: galsOfProduct,
          waterPerc: galsOfWaterPerc * 100 || 0.00,
          productPerc: galsOfProdPerc * 100 || 0.00
      }

    // galsOfWaterPerc and galsOfProdPerc are dependent on DILUTE_WEIGHT_TO_VOLUME
    // to be called so they can be initialized
    case ConversionActions.DILUTE_VOLUME_TO_WEIGHT:
      WATER_POUNDS_PER_GAL = 8.35;

      galsOfProdPerc = state.productPerc;
      galsOfWaterPerc = state.waterPerc;

      let poundsOfProd = galsOfProdPerc * state.dilutedMetrics.brix;
      let poundsOfWater = galsOfWaterPerc * WATER_POUNDS_PER_GAL;

      let totalPounds = poundsOfProd + poundsOfWater;
      let poundsOfProdPerc = poundsOfProd / totalPounds;
      let poundsOfWaterPerc = poundsOfWater / totalPounds;

      if(poundsOfWaterPerc === NaN) {
        poundsOfWaterPerc = 0.0;
      }

      if(poundsOfProdPerc === NaN) {
        poundsOfProdPerc = 0.0;
      }

      return {
        ...state,
        dilutionRate: galsOfProduct,
        waterPerc: poundsOfWaterPerc * 100,
        productPerc: poundsOfProdPerc * 100
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
