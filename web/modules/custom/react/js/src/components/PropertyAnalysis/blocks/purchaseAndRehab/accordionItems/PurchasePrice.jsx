import React, {Component} from 'react';
import Accordion from 'react-bootstrap/Accordion';
import Card from 'react-bootstrap/Card';
import PurchasePriceControl from '../controls/PurchasePriceControl';
import PurchasePriceValues from '../rowValues/PurchasePriceValues';


class PurchasePrice extends Component {

  render() {
    // console.log('[PurchasePrice.jsx] render', this.props);

    return (
      <Card>
        <Accordion.Toggle as={Card.Header} eventKey={this.props.idx}>
          <PurchasePriceValues {...this.props} />
        </Accordion.Toggle>
        <Accordion.Collapse eventKey={this.props.idx}>
          <Card.Body>
            <PurchasePriceControl {...this.props}/>
          </Card.Body>
        </Accordion.Collapse>
      </Card>
    );
  }

}

export default PurchasePrice;
