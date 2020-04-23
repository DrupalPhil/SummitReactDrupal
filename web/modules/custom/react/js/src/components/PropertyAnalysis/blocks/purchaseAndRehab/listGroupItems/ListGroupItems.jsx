import React from 'react';
import PurchasePriceValues from '../rowValues/PurchasePriceValues';
import ListGroup from 'react-bootstrap/ListGroup';
import LoanAmountValues from '../rowValues/LoanAmountValues';
import PurchaseCostValues from '../rowValues/PurchaseCostValues';

const selectModifierForm = (form) => {
  console.log(form);
  // Load switch component
  // Slide
};

export const ListGroupItems = (props) => {
  // console.log('[ListGroupItems.jsx] render', props);

  return (
    <ListGroup>
      <ListGroup.Item
        action
        onClick={() => {
          props.actions.setModifierForm('PurchasePriceControl');
          props.slideTo(2);
        }}
      >
        <PurchasePriceValues {...props} />
      </ListGroup.Item>
      <ListGroup.Item
        action
        onClick={() => {
          props.actions.setModifierForm('LoanAmountControl');
          props.slideTo(2);
        }}
      >
        <LoanAmountValues {...props} />
      </ListGroup.Item>
      {/*<ListGroup.Item*/}
      {/*  action*/}
      {/*  onClick={() => props.actions.setModifierForm('PurchaseCostsPage')}*/}
      {/*>*/}
      {/*  PurchaseCostsPage*/}
      {/*</ListGroup.Item>*/}
      {/*<ListGroup.Item*/}
      {/*  action*/}
      {/*  onClick={() => props.actions.setModifierForm('PurchaseCostsForms')}*/}
      {/*>*/}
      {/*  PurchaseCostsForms*/}
      {/*</ListGroup.Item>*/}
      {/*<ListGroup.Item*/}
      {/*  action*/}
      {/*  onClick={() => {*/}
      {/*    props.swiper.slideNext();*/}
      {/*    props.actions.setModifierForm('PurchaseCostsListing');*/}
      {/*  }}*/}
      {/*>*/}
      {/*  PurchaseCostsListing*/}
      {/*</ListGroup.Item>*/}
    </ListGroup>
  );
};

export default ListGroupItems;
