import React, {Component, useEffect} from "react";
import Accordion from 'react-bootstrap/Accordion';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

class RehabCosts extends Component {

  render() {
    return (
      <Card>
        <Accordion.Toggle as={Card.Header} eventKey={this.props.idx}>
          <div className="row">
            <div className="col-3">
              <strong>Rehab Costs</strong>
            </div>
            <div className="col-auto">
              {this.props.state.analysis.data.rehabCosts}
            </div>
          </div>
        </Accordion.Toggle>
        <Accordion.Collapse eventKey={this.props.idx}>
          <Card.Body>Hello! I'm the body</Card.Body>
        </Accordion.Collapse>
      </Card>
    );
  }

}


export default RehabCosts;
