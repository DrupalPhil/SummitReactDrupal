import React from 'react';
import Accordion from 'react-bootstrap/Accordion';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import PurchaseCostsListingItem from './PurchaseCostsListingItem';
import PurchaseCostsFormsItem from './PurchaseCostsFormsItem';

export const PurchaseCostsListing = (props) => {

  return (
    <>
      <ListGroup variant="flush">
        {
          props.analysisStore.itemizedPurchaseCosts.map((item, index) => (
            <ListGroup.Item key={index}>
              <PurchaseCostsListingItem
                {...props}
                item={props.analysisStore.itemizedPurchaseCosts[index]}/>
            </ListGroup.Item>
          ))
        }
      </ListGroup>
    </>
  );
};

export default PurchaseCostsListing;

