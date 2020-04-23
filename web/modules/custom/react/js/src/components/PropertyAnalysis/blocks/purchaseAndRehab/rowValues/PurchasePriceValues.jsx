import React, {Component} from 'react';
import Badge from 'react-bootstrap/Badge';
import {dollarFormat, percentFormat} from '../../../../../utilityFilters';

class PurchasePriceValues extends Component {

  render() {
    // console.log('[PurchasePriceValues.jsx] render', this.props);

    return (
      <div className="row justify-content-between">
        <div className="col-4">
          <strong>Purchase Price</strong>
        </div>
        <div className="col-auto text-right">
          <div className="row">
            <div className="col">
              <Badge variant="light">
                {percentFormat(this.props.state.analysis.data.offerPrice / this.props.state.analysis.data.askingPrice)} of asking
              </Badge>
            </div>
            <div className="col">
              {dollarFormat(this.props.state.analysis.data.offerPrice)}
            </div>
          </div>
        </div>
      </div>
    );
  }

}

export default PurchasePriceValues;
