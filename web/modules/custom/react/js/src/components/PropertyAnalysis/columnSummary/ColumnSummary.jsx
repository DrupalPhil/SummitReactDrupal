import React, {Component} from 'react';
import ListGroupItems
  from '../blocks/purchaseAndRehab/listGroupItems/ListGroupItems';

class ColumnSummary extends Component {

  componentDidMount() {
    // console.log('[ColumnSummary.jsx] componentDidMount', this.props);
  }

  componentDidUpdate() {
    // console.log('[ColumnSummary.jsx] componentDidUpdate', this.props);
  }

  render() {

    return (
      <>
        {
          this.props.state.analysis.analysisSuccess &&
          <ListGroupItems
            {...this.props}
          />
        }
      </>
    );
  }
}

export default ColumnSummary;
