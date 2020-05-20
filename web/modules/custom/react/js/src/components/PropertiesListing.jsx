import React, {Component} from 'react';
import ListGroup from 'react-bootstrap/ListGroup';
import {dollarFormat} from '../utilityFilters';

class PropertiesListing extends Component {

  componentDidMount() {
    console.log('[PropertiesListing.jsx] componentDidMount', this.props);
  }

  componentDidUpdate() {
    console.log('[PropertiesListing.jsx] componentDidUpdate', this.props);
  }

  selectProperty = (item) => {
    // this.props.actions.getProperty(item.id);
    this.props.actions.setProperty(item);
    this.props.actions.initAnalysis(item);
    this.props.slideTo(1);
    this.props.history.push(item.id);
  }

  isActive = (itemId) => {
    if(
      this.props.state.property &&
      this.props.state.property.results &&
      this.props.state.property.results.id == itemId
    ) {
      return true;
    } else {
      return false;
    }
  }

  render() {
    return (
      <>
        <ListGroup>

          {
            this.props.state.properties &&
            this.props.state.properties.results &&
            this.props.state.properties.results.data.map((item, index) => (
                <ListGroup.Item
                  key={index}
                  active={this.isActive(item.id)}
                  action
                  onClick={() => {
                    this.selectProperty(item);
                  }}
                >
                  <div>{item.attributes.title}</div>
                  <div>{dollarFormat(item.attributes.field_asking_price)}</div>
                </ListGroup.Item>
              ),
            )
          }

        </ListGroup>
      </>
    );
  }
}

export default PropertiesListing;
