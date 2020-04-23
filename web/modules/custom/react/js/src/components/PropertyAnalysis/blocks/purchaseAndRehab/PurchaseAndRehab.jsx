import React, {Component} from 'react';
import Accordion from 'react-bootstrap/Accordion';
import * as accordionItem from './accordionItems/accordionItems';
import ListGroupItems from './listGroupItems/ListGroupItems';

class PurchaseAndRehab extends Component {

  render() {
    // console.log('[PurchaseAndRehab.jsx] render', this.props);
    return (
      <div className="group-wrapper">
        <h2>Purchase & Rehab</h2>
        <ListGroupItems {...this.props}/>
        <Accordion defaultActiveKey="0">
          <accordionItem.PurchasePrice {...this.props} idx={'0'}/>
          <accordionItem.LoanAmount {...this.props} idx={'0'}/>
          <accordionItem.DownPayment {...this.props} idx={'0'}/>
        {/*  <accordionItem.PurchaseCosts {...this.props} idx={'0'}/>*/}
        {/*  <accordionItem.RehabCosts {...this.props} idx={'0'}/>*/}
        {/*  <accordionItem.TotalCashNeeded {...this.props} idx={'0'}/>*/}
        </Accordion>
      </div>
    );
  }

}

export default PurchaseAndRehab;
