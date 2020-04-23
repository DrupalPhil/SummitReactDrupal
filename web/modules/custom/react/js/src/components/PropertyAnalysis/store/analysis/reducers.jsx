import * as actionTypes from './actionTypes';
import {newState} from '../utilities';

function analysis(state = {}, action) {
  switch (action.type) {

    case actionTypes.SET_MODIFIER_FORM:
      return newState(state, {modifierForm: action.payload});


    /*
    * This initialization requires a property json node being sent to it
    * This only takes a drupal node and initializes the analysis
    * */
    case actionTypes.INIT_ANALYSIS:

      const defaultState = {
        title: action.payload.attributes.title,
        askingPrice: +action.payload.attributes.field_asking_price,
        offerPrice: +action.payload.attributes.field_asking_price,

        customDownPmt: false,
        downPmt: +action.payload.attributes.field_asking_price * 0.2,
        customLoanAmount: false,
        loanAmount: +action.payload.attributes.field_asking_price * 0.8,
        downPmtPercent: (+action.payload.attributes.field_asking_price * 0.2) /  +action.payload.attributes.field_asking_price,

        purchaseCosts: 0,
        itemizePurchaseCosts: true,
        itemizedPurchaseCosts: [
          {
            name: "Loan Origination Fee",
            type: "setAmount",
            amount: 955,
            wrapIntoLoan: false,
          },
          {
            name: "Loan Points",
            type: "percent",
            percent: 0.02125,
            relativeTo: "loan",
            wrapIntoLoan: true,
          },
          {
            name: "Flood Certification",
            type: "setAmount",
            amount: 17,
            wrapIntoLoan: false,
            ignore: true,
          },
        ],

        grossRent: 650, //TODO: Get this from... ?
      };

      // return state;
      return newState(state, {
        analysisSuccess: true,
        data: defaultState
      });

    case actionTypes.SET_OFFER_PRICE:
      return newState(state, {data: {offerPrice: +action.payload}});


    case actionTypes.SET_DOWN_PAYMENT:
      return newState(state, {
        customDownPmt: true,
        downPmt: +action.payload,
        // downPmtPercent: +action.payload / state.offerPrice,
      });

    case actionTypes.SET_DOWN_PAYMENT_PERCENT:
      return newState(state, {
        customDownPmt: false,
        // downPmt: +action.payload * state.offerPrice,
        downPmtPercent: +action.payload,
      });

    case actionTypes.REORDER_ITEMIZED_PURCHASE_COSTS:
      return newState(state, {itemizedPurchaseCosts: action.payload});

    case actionTypes.CALC_DOWN_PAYMENT:
      let newData = {};
      if(state.customDownPmt) {
        newData = {
          downPmtPercent: state.downPmt / state.offerPrice,
        }
      } else {
        newData = {
          downPmt: state.downPmtPercent * state.offerPrice,
        }
      }
      return newState(state, newData);

    // case actionTypes.CALC_DOWN_PAYMENT_PERCENT:
    //   return newState(state, {downPmtPercent: state.downPmt / state.offerPrice});

    case actionTypes.SET_LOAN_AMOUNT:
      return newState(state, {
        customLoanAmount: true,
        loanAmount: +action.payload,
      });

    // Expects:
    // @param items             Array of Purchase Cost Items
    // @param index (optional)  Index of item in question
    case actionTypes.UPDATE_PURCHASE_COST_ITEM:
      // no index -- new
      // index -- item
      // console.log(action.payload);

      const currentPurchaseCostItems = state.itemizedPurchaseCosts;
      //
      // if (action.payload.index) {
      // }
      //
      const itemizedPurchaseCosts = currentPurchaseCostItems.map((item, index) => {
        if (index !== action.payload.index) {
          // This isn't the item we care about - keep it as-is
          return item
        }

        // Otherwise, this is the one we want - return an updated value
        return {
          ...item,
          ...action.payload.item
        }
      });

      // console.log(currentPurchaseCostItems);
      // console.log(itemizedPurchaseCost);

      return newState(state, {itemizedPurchaseCosts: itemizedPurchaseCosts});



    case actionTypes.ADD_PURCHASE_COST_ITEM:
    {
      const itemizedPurchaseCosts = [...state.itemizedPurchaseCosts];
      itemizedPurchaseCosts.push({
        name: 'Purchase Cost #' + (itemizedPurchaseCosts.length+1),
        type: "setAmount",
        amount: '',
        wrapIntoLoan: false,
      })
      return newState(state, {itemizedPurchaseCosts: itemizedPurchaseCosts});
    }

    case actionTypes.DELETE_PURCHASE_COST_ITEM:
    {
      const itemizedPurchaseCosts = [...state.itemizedPurchaseCosts];
      itemizedPurchaseCosts.splice(action.payload, 1);
      return newState(state, {itemizedPurchaseCosts: itemizedPurchaseCosts});
    }

    case actionTypes.CALC_LOAN_AMOUNT:
      return newState(state, {loanAmount: state.offerPrice - state.downPmt});

    case actionTypes.CALC_TOTAL_CASH_NEEDED:
      const downPmt = typeof state.downPmt === 'number' ? state.downPmt : 0;
      const purchaseCosts = typeof state.purchaseCosts === 'number' ? state.purchaseCosts : 0;
      const rehabCosts = typeof state.rehabCosts === 'number' ? state.rehabCosts : 0;
      return newState(state, {totalCashNeeded: +downPmt + +purchaseCosts + +rehabCosts});

    case actionTypes.CALC_PURCHASE_COSTS:
      // If itemized expenses are empty, stop
      if (state.itemizePurchaseCosts === undefined) {
        return state;
      }

      // If itemized expenses are disabled, stop
      if (state.itemizePurchaseCosts === false) {
        return state;
      }

      var purchaseCostsUpfront = 0;
      var purchaseCostsWrapped = 0;
      const newValues = state.itemizedPurchaseCosts.map((itemizedPurchaseCost) => {
        const item = {...itemizedPurchaseCost};

        item.total = 0;

        if(item.ignore) {
          return item;
        }

        switch (item.type) {
          case 'setAmount':
            if(item.wrapIntoLoan) {
              purchaseCostsWrapped += item.amount;
            } else {
              purchaseCostsUpfront += item.amount;
            }
            item.total = item.amount ? item.amount : 0;
            return item;
          case 'percent':
            switch (item.relativeTo) {
              case 'loan':
                if(item.wrapIntoLoan) {
                  purchaseCostsWrapped += (item.percent * state.loanAmount);
                } else {
                  purchaseCostsUpfront += (item.percent * state.loanAmount);
                }
                item.total = item.percent ? item.percent * state.loanAmount : 0;
                return item;
              case 'price':
                if(item.wrapIntoLoan) {
                  purchaseCostsWrapped += (item.percent * state.offerPrice);
                } else {
                  purchaseCostsUpfront += (item.percent * state.offerPrice);
                }
                item.total = item.percent ? item.percent * state.offerPrice : 0;
                return item;
            }
        }
      })

      const totalPurchaseCosts = newValues.reduce((a, b) => a + b.total, 0);

      return newState(state, {
        purchaseCostsUpfront: purchaseCostsUpfront ? purchaseCostsUpfront : 0,
        purchaseCostsWrapped: purchaseCostsWrapped ? purchaseCostsWrapped : 0,
        purchaseCosts: totalPurchaseCosts ? totalPurchaseCosts : 0,
        itemizedPurchaseCosts: newValues
      });
    default:
      return state;
  }
}

// const analysis = combineReducers({
//   analysis
// })

export default analysis;
