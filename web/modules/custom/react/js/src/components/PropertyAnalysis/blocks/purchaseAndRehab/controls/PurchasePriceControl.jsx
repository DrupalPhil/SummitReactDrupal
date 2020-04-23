import React, {Component} from 'react';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import NumberFormat from "react-number-format";
import FormControl from 'react-bootstrap/FormControl';
import {makeStyles, withStyles} from '@material-ui/core/styles';
import Slider from '@material-ui/core/Slider';
import {dollarFormat} from '../../../../../utilityFilters';
import { debounce } from 'lodash';

const min = 0;
const max = 0;
const marks = [];

const useStyles = makeStyles((theme) => ({
  root: {
    width: 300 + theme.spacing(3) * 2,
  },
  margin: {
    height: theme.spacing(3),
  },
}));

const iOSBoxShadow =
  '0 3px 1px rgba(0,0,0,0.1),0 4px 8px rgba(0,0,0,0.13),0 0 0 1px rgba(0,0,0,0.02)';

const IOSSlider = withStyles({
  root: {
    color: '#3880ff',
    height: 2,
    padding: '15px 0',
  },
  thumb: {
    height: 28,
    width: 28,
    backgroundColor: '#fff',
    boxShadow: iOSBoxShadow,
    marginTop: -14,
    marginLeft: -14,
    '&:focus, &:hover, &$active': {
      boxShadow: '0 3px 1px rgba(0,0,0,0.1),0 4px 8px rgba(0,0,0,0.3),0 0 0 1px rgba(0,0,0,0.02)',
      // Reset on touch devices, it doesn't add specificity
      '@media (hover: none)': {
        boxShadow: iOSBoxShadow,
      },
    },
  },
  active: {},
  valueLabel: {
    left: 'calc(-50% + 11px)',
    top: -22,
    '& *': {
      background: 'transparent',
      color: '#000',
    },
  },
  track: {
    height: 2,
  },
  rail: {
    height: 2,
    opacity: 0.5,
    backgroundColor: '#bfbfbf',
  },
  mark: {
    backgroundColor: '#bfbfbf',
    height: 8,
    width: 1,
    marginTop: -3,
  },
  markActive: {
    opacity: 1,
    backgroundColor: 'currentColor',
  },
})(Slider);

class PurchasePriceControl extends Component {

  analysis = {...this.props.state.analysis.data};
  min = this.analysis.askingPrice * 0.2;
  max = this.analysis.askingPrice * 1.2;
  defaultValue = this.analysis.offerPrice;

  marks = [
    {
      value: this.props.state.analysis.data.grossRent / 0.015,
      label: dollarFormat(this.props.state.analysis.data.grossRent / 0.015),
    },
    {
      value: this.props.state.analysis.data.grossRent / 0.02,
      label: dollarFormat(this.props.state.analysis.data.grossRent / 0.02),
    },
  ];

  handleSliderChange = (event, newValue) => {
    this.props.actions.setOfferPrice(newValue);
  };

  render() {
    // console.log('[PurchasePriceControl.jsx] render', this.props);

    return (
      <React.Fragment>

        <Form>

              {/*TODO: Instead of firing this off every tick,*/}
              {/*Let this fire off a reducer that triggers the setOfferPrice*/}
              {/*This way, you can throttle the reducer --> trigger*/}
              <IOSSlider
                defaultValue={this.defaultValue}
                valueLabelFormat={this.formatCurrency}
                aria-labelledby="discrete-slider-custom"
                valueLabelDisplay="on"
                min={this.min}
                max={this.max}
                step={500}
                marks={this.marks}
                value={this.props.state.analysis.data.offerPrice}
                onChange={this.handleSliderChange}
              />

              <Form.Group controlId="setOfferPrice">
                <InputGroup className="mb-3">
                  <InputGroup.Prepend>
                    <InputGroup.Text>$</InputGroup.Text>
                  </InputGroup.Prepend>
                  <NumberFormat
                    thousandSeparator={true}
                    value={this.props.state.analysis.data.offerPrice}
                    customInput={FormControl}
                    onValueChange={(values) => {
                      const {formattedValue, value} = values;
                      this.props.actions.setOfferPrice(value);
                    }}
                  />
                </InputGroup>
              </Form.Group>

        </Form>

      </React.Fragment>
    );
  }
}

export default PurchasePriceControl;
