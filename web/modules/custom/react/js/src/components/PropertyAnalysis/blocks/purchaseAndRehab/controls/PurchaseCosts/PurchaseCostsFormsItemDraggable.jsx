import React from 'react';
import Accordion from 'react-bootstrap/Accordion';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import {Draggable} from 'react-beautiful-dnd';
import PurchaseCostsFormsItem from './PurchaseCostsFormsItem';


const getItemStyle = (isDragging, draggableStyle) => ({
  opacity: isDragging ? '0.5' : '1',
});

// const Handle = styled.div`
//
// `;

/*
* @param item
* @param index
* */
export const PurchaseCostsFormsItemDraggable = (props) => {

  return (
    <>
      <Draggable
        draggableId={props.index.toString()}
        key={props.index}
        index={props.index}
      >

        {(provided, snapshot) => (
          <ListGroup.Item
            {...provided.draggableProps}
            ref={provided.innerRef}
          >
            <div className="dragHandle">
              <i className="fas fa-arrows-v" {...provided.dragHandleProps}></i>
            </div>
            <div
              style={getItemStyle(
                snapshot.isDragging,
                provided.draggableProps.style
              )}
            >
              <PurchaseCostsFormsItem
                key={props.index}
                {...props}
                item={props.analysisStore.itemizedPurchaseCosts[props.index]}
                index={props.index}
                isDraggable={Math.random()}
              />
            </div>
          </ListGroup.Item>
        )}

      </Draggable>
    </>
  );
};

export default PurchaseCostsFormsItemDraggable;

