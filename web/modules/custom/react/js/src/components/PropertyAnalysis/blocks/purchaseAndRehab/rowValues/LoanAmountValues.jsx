import React, {Component} from 'react';
import {dollarFormat} from '../../../../../utilityFilters';

class LoanAmountValues extends Component {

  render() {
    // console.log('[LoanAmountValues.jsx] render', this.props);
    return (
      <div className="row justify-content-between">
        <div className="col-4">
          <strong>Loan Amount</strong>
        </div>
        <div className="col-auto text-right">
          {dollarFormat(this.props.state.analysis.data.loanAmount)}
        </div>
      </div>
    );
  }

}

export default LoanAmountValues;
