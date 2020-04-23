import React, {Component} from 'react';
import Accordion from 'react-bootstrap/Accordion';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import Button from 'react-bootstrap/Button';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown';
import NumberFormat from "react-number-format";
import Form from 'react-bootstrap/Form';

/*
* @param item
* @param index
* */
class PurchaseCostsFormsItem extends Component {

  render() {

    const handleChange = (property, value) => {
      const newItem = {...this.props.item.item};

      newItem[property] = value;

      if (property == "type" && typeof newItem.relativeTo === 'undefined') {
        newItem.relativeTo = 'price';
      }

      this.props.actions.updatePurchaseCostItem({
        index: this.props.index,
        item: newItem,
      });
    };

    const handleDelete = () => {
      this.props.actions.deletePurchaseCostItem(this.props.index);
    }

    const getLabel = (key) => {
      switch (key) {
        case 'setAmount':
          return 'Set Amount';
        case 'percent':
          return 'Percent';
        case 'loan':
          return 'of Loan';
        case 'price':
          return 'of Price';
        default:
          return 'Not Defined';
      }
    };

    const fieldNameAndType = (
      <InputGroup className="mb-3">
        <FormControl
          value={this.props.item.name ? this.props.item.name : ''}
          onChange={(event) => {
            handleChange('name', event.target.value);
          }}
          placeholder="Name"
          aria-label="Name"
        />
        <DropdownButton
          as={InputGroup.Append}
          variant="primary"
          title={getLabel(this.props.item.type)}
          id="select-type"
        >
          <Dropdown.Item
            value="setAmount"
            onSelect={() => {
              handleChange('type', 'setAmount');
            }}>
            Set Amount
          </Dropdown.Item>
          <Dropdown.Item
            value="percent"
            onClick={() => {
              handleChange('type', 'percent', {item: this.props.item}, this.props.index);
            }}>
            Percent
          </Dropdown.Item>
        </DropdownButton>
      </InputGroup>
    )

    const fieldDollarValue = (
      <InputGroup className="mb-3">
        <InputGroup.Prepend>
          <InputGroup.Text>$</InputGroup.Text>
        </InputGroup.Prepend>
        <NumberFormat
          thousandSeparator={true}
          value={this.props.item.amount ? this.props.item.amount : ''}
          customInput={FormControl}
          onValueChange={(values) => {
            const {formattedValue, value} = values;
            handleChange('amount', +value);
          }}
        />
      </InputGroup>
    )

    const fieldPercentValue = (
      <InputGroup className="mb-3">
        <NumberFormat
          decimalScale={3}
          thousandSeparator={true}
          value={this.props.item.percent ? this.props.item.percent * 100 : ''}
          customInput={FormControl}
          onValueChange={(values) => {
            const {formattedValue, value} = values;
            handleChange('percent', +value / 100);
          }}
        />
        <InputGroup.Append>
          <InputGroup.Text>%</InputGroup.Text>
        </InputGroup.Append>
        <DropdownButton
          as={InputGroup.Append}
          variant="primary"
          title={getLabel(this.props.item.relativeTo)}
          id="select-type"
        >
          <Dropdown.Item
            value="loan"
            onSelect={() => {
              handleChange('relativeTo', 'loan');
            }}>
            % of Loan
          </Dropdown.Item>
          <Dropdown.Item
            value="price"
            onClick={() => {
              handleChange('relativeTo', 'price');
            }}>
            % of Price
          </Dropdown.Item>
        </DropdownButton>
      </InputGroup>
    )

    const fieldWrapIntoLoanValue = (
      <>
        <div className="row align-items-center">
          <div className="col-8">
            <Form.Check
              type="switch"
              id={'wrap-switch-' + this.props.index}
              checked={this.props.item.wrapIntoLoan}
              label="Wrap into loan"
              onChange={(event) => {
                handleChange('wrapIntoLoan', event.target.checked);
              }}
            />
            <Form.Check
              type="switch"
              id={'ignore-switch-' + this.props.index}
              checked={this.props.item.ignore ? this.props.item.ignore : false}
              label="Ignore"
              onChange={(event) => {
                handleChange('ignore', event.target.checked);
              }}
            />
          </div>
          <div className="col-4 text-right">
            <Button
              className="deleteItem"
              variant="outline-danger"
              onClick={handleDelete}
            >
              <i className="fas fa-trash-alt"></i>
            </Button>
          </div>
        </div>
      </>
    )

    return (
      <>
        {/* AVOID HAVING LAYOUT OR COMPONENT RELATED HTML IN HERE */}
        {fieldNameAndType}
        {
          this.props.item.type == 'setAmount'
          ? fieldDollarValue
          : null
        }
        {
          this.props.item.type == 'percent'
          ? fieldPercentValue
          : null
        }
        {fieldWrapIntoLoanValue}
      </>
    );
  }
};

export default PurchaseCostsFormsItem;

