import React, {Component} from 'react';
import Accordion from 'react-bootstrap/Accordion';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import PurchaseCostsFormsItemDraggable from './PurchaseCostsFormsItemDraggable';
import {DragDropContext} from 'react-beautiful-dnd';
import {Droppable} from 'react-beautiful-dnd';
import {Draggable} from 'react-beautiful-dnd';

const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

// export const PurchaseCostsForms = (props) => {
class PurchaseCostsFormsDraggable extends Component {

  onDragEnd = result => {
    const {destination, source, draggableId} = result;

    if (!destination) {
      return;
    }

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    const items = [...this.props.state.analysis.data.itemizedPurchaseCosts];

    const results = reorder(
      items,
      source.index,
      destination.index,
    );

    this.props.actions.reorderItemizedPurchaseCosts(results);
  };

  render() {
    return (
      <>
        <DragDropContext
          onDragEnd={this.onDragEnd}>
          <Droppable
            droppableId="itemizedPurchaseCosts"
          >
            {(provided) => (
              <ListGroup
                className='draggable'
                variant="flush"
                {...provided.droppableProps}
                ref={provided.innerRef}
              >

                {
                  this.props.state.analysis.data.itemizedPurchaseCosts.map(
                    (item, index) => (
                      <PurchaseCostsFormsItemDraggable
                        key={index}
                        {...this.props}
                        item={this.props.state.analysis.data.itemizedPurchaseCosts[index]}
                        index={index}
                      />
                    ))
                }

                {provided.placeholder}
              </ListGroup>
            )}
          </Droppable>
        </DragDropContext>
      </>
    );
  }
};

export default PurchaseCostsFormsDraggable;

