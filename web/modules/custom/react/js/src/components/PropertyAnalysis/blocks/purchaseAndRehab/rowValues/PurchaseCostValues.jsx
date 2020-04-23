import React, {Component} from 'react';
import {dollarFormat} from '../../../../../utilityFilters';

class PurchaseCostValues extends Component {

  render() {
    // console.log('[PurchaseCostValues.jsx] render', this.props);
    return (
      <div className="row justify-content-between">
        <div className="col-4">
          <strong>Purchase Costs</strong>
        </div>
        <div className="col-auto text-right">
          {dollarFormat(this.props.state.analysis.data.purchaseCosts)}
        </div>
      </div>
    );
  }

}

export default PurchaseCostValues;
