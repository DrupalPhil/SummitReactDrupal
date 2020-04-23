import React from 'react';
import * as PurchaseCosts from './PurchaseCosts';
import {dollarFormat} from '../../../../../../utilityFilters';

export const PurchaseCostsPage = (props) => {

  return (
    <>
      <h3 className="mb-4">Purchase Costs</h3>
      <h5 className="mb-0">{dollarFormat(props.analysisStore.purchaseCosts)}</h5>
      <small className="text-muted">Combined Upfront & Wrapped</small>
      <div className="my-3">
        <div className="row">
          <div className="col-3 text-muted">Upfront:</div>
          <div className="col h6">{dollarFormat(props.analysisStore.purchaseCostsUpfront)}</div>
        </div>
        <div className="row">
          <div className="col-3 text-muted">Wrapped:</div>
          <div className="col h6">{dollarFormat(props.analysisStore.purchaseCostsWrapped)}</div>
        </div>
      </div>
      <PurchaseCosts.PurchaseCostsListing {...props} />
      <PurchaseCosts.PurchaseCostsForms {...props} />
      <PurchaseCosts.PurchaseCostsFormsDraggable {...props} />
    </>
  );
}

export default PurchaseCostsPage;

