import React from 'react';
import LoanAmountControl from './LoanAmountControl';
import PurchasePriceControl from './PurchasePriceControl';
import {PurchaseCostsPage} from './PurchaseCosts/PurchaseCosts';
import {PurchaseCostsListing} from './PurchaseCosts/PurchaseCosts';
import {PurchaseCostsForms} from './PurchaseCosts/PurchaseCosts';

const AsideComponents = {
  PurchasePriceControl,
  PurchaseCostsPage,
  PurchaseCostsListing,
  PurchaseCostsForms,
  LoanAmountControl,
};

export const SwitchControls = (props) => {
  // console.log('[SwitchControls.jsx] render', props);
  let Component = AsideComponents[props.state.analysis.modifierForm];
  return (
    <Component {...props} />
  );
};

export default SwitchControls;
