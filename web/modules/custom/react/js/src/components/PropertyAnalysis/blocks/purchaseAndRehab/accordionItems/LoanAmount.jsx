import React, {Component} from 'react';
import Accordion from 'react-bootstrap/Accordion';
import Card from 'react-bootstrap/Card';
import {dollarFormat} from '../../../../../utilityFilters';
import LoanAmountControl from '../controls/LoanAmountControl';
import LoanAmountValues from '../rowValues/LoanAmountValues';
import ListGroup from 'react-bootstrap/ListGroup';

class LoanAmount extends Component {

  render() {
    return (
      <Card>
        <Accordion.Toggle as={Card.Header} eventKey={this.props.idx}>
          <LoanAmountValues {...this.props} />
        </Accordion.Toggle>
        <Accordion.Collapse eventKey={this.props.idx}>
          <Card.Body>
            <LoanAmountControl {...this.props} />
          </Card.Body>
        </Accordion.Collapse>
      </Card>
    );
  }

}

export default LoanAmount;
