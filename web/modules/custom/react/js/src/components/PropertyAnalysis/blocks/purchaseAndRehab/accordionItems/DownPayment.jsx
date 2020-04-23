import React, {Component, useEffect} from 'react';
import Accordion from 'react-bootstrap/Accordion';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import Badge from 'react-bootstrap/Badge';
import {dollarFormat} from '../../../../../utilityFilters';
import {percentFormat} from '../../../../../utilityFilters';
import NumberFormat from "react-number-format";
import Switch from '@material-ui/core/Switch/Switch';

class DownPayment extends Component {

  render() {
    return (
      <Card>
        <Accordion.Toggle as={Card.Header} eventKey={this.props.idx}>
          <div className="row justify-content-between">
            <div className="col-4">
              <strong>Down Payment</strong>
            </div>
            <div className="col-auto text-right">
              <div className="row">
                <div className="col">
                  <Badge variant="light">
                    {percentFormat(this.props.state.analysis.data.offerPrice / this.props.state.analysis.data.askingPrice)} of asking
                  </Badge>
                </div>
                <div className="col">
                  {dollarFormat(this.props.state.analysis.data.downPayment)}
                </div>
              </div>
            </div>
          </div>
        </Accordion.Toggle>
        <Accordion.Collapse eventKey={this.props.idx}>
          <Card.Body>

            <Switch
              checked={this.props.state.analysis.data.customDownPmt}
              color="primary"
              name="checkedB"
              inputprops={{ 'aria-label': 'primary checkbox' }}
            />

            <Form>
              <div className="row">
                <div className="col-7">
                  <Form.Group controlId="setDownPayment">
                    <InputGroup className="mb-3">
                      <InputGroup.Prepend>
                        <InputGroup.Text>$</InputGroup.Text>
                      </InputGroup.Prepend>
                      <NumberFormat
                        decimalScale={0}
                        thousandSeparator={true}
                        value={this.props.state.analysis.data.downPmt}
                        customInput={FormControl}
                        onChange={(event) => {
                          this.props.actions.setDownPayment(event.target.value.replace(/\D/g, ""));
                        }}
                      />
                    </InputGroup>
                  </Form.Group>
                </div>
                <div className="col-5">
                  <Form.Group controlId="setDownPayment">
                    <InputGroup className="mb-3">
                      <NumberFormat
                        decimalScale={2}
                        allowLeadingZeros={false}
                        value={this.props.state.analysis.data.downPmtPercent * 100}
                        customInput={FormControl}
                        onChange={(event) => {
                          this.props.actions.setDownPaymentPercent(event.target.value / 100);
                        }}
                      />
                      <InputGroup.Append>
                        <InputGroup.Text>%</InputGroup.Text>
                      </InputGroup.Append>
                    </InputGroup>
                  </Form.Group>
                </div>
              </div>
            </Form>

          </Card.Body>
        </Accordion.Collapse>
      </Card>
    );
  }

}

export default DownPayment;
