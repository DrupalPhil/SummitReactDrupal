import React, {Component} from 'react';
import Accordion from 'react-bootstrap/Accordion';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/Button';
import PurchaseCostsFormsItem from './PurchaseCostsFormsItem';
import PurchaseCostsListingItem from './PurchaseCostsListingItem';

// export const PurchaseCostsForms = (props) => {
class PurchaseCostsForms extends Component {

  render() {

    const handleAddNew = () => {
      this.props.actions.addPurchaseCostItem();
    }

    return (
      <>
        <ListGroup
          variant="flush"
        >
          {
            this.props.state.analysis.data.itemizedPurchaseCosts.map(
              (item, index) => (
                <ListGroup.Item
                  key={index}
                >
                  <PurchaseCostsFormsItem
                    {...this.props}
                    item={this.props.state.analysis.data.itemizedPurchaseCosts[index]}
                    index={index}
                  />
                </ListGroup.Item>
              ))
          }
        </ListGroup>

        <Button
          variant="primary"
          block
          onClick={handleAddNew}
        >
          Add Itemized Purchase Cost Item
        </Button>
      </>
    );
  }
};

export default PurchaseCostsForms;

