import React from 'react';
import {dollarFormat} from '../../../../../../utilityFilters';

export const PurchaseCostsListingItem = (props) => {

  return (
    <>
      {/* AVOID HAVING LAYOUT OR COMPONENT RELATED HTML IN HERE */}
      <div className="row justify-content-between">
        <div className="col">{props.item.name}</div>
        <div className="col text-right">
          <strong>{dollarFormat(props.item.total)}</strong>
        </div>
      </div>
    </>
  );
};

export default PurchaseCostsListingItem;

