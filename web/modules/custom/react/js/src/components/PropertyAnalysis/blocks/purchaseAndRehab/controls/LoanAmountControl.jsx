import React, {Component} from 'react';
import Switch from '@material-ui/core/Switch/Switch';
import InputGroup from 'react-bootstrap/InputGroup';
import NumberFormat from 'react-number-format';
import Alert from 'react-bootstrap/Alert';
import {dollarFormat} from '../../../../../utilityFilters';
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';

class LoanAmountControl extends Component {

  render() {
    // console.log('[LoanAmountControl.jsx] render', this.props);

    const LoanAmountInput = ({customInputProps, ...inputProps}) => {
      return <FormControl
        disabled={!this.props.state.analysis.data.customLoanAmount}/>;
    };

    return (
      <React.Fragment>

        <Switch
          checked={this.props.state.analysis.data.customLoanAmount}
          color="primary"
          name="checkedB"
          inputprops={{'aria-label': 'primary checkbox'}}
        />

        <Form>
          <Form.Group controlId="setLoanAmount">
            <InputGroup className="mb-3">
              <InputGroup.Prepend>
                <InputGroup.Text>$</InputGroup.Text>
              </InputGroup.Prepend>
              <NumberFormat
                decimalScale={0}
                thousandSeparator={true}
                value={this.props.state.analysis.data.loanAmount}
                customInput={LoanAmountInput}
                onChange={(event) => {
                  console.log(
                    '[LoanAmount.jsx] LoanAmount - You haven\'t set this up yet...');
                  // this.actions.setLoanAmount(event.target.value.replace(/\D/g, ""));
                }}
              />
            </InputGroup>
          </Form.Group>
        </Form>

        <Alert className='text-center' variant='light'>
          {dollarFormat(this.props.state.analysis.data.offerPrice)} - {dollarFormat(
          this.props.state.analysis.data.downPmt)} = {dollarFormat(
          this.props.state.analysis.data.loanAmount)}
        </Alert>

      </React.Fragment>
    );
  }
}

export default LoanAmountControl;
