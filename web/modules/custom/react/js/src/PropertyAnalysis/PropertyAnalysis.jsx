import React, {Component} from 'react';
import {connect} from 'react-redux';
import * as actionCreators from './store/allCreators';
import withSizes from 'react-sizes';
import * as vw from './store/utilities';
import Zillow from '../zillow/Zillow';
import Layout from '../components/PropertyAnalysis/Layout';

const mapStateToProps = state => {
  return {state};
};

const mapSizesToProps = (sizes) => ({
  sizes: {
    width: vw.width(sizes),
    atBreakpoint: vw.atBreakpoint(sizes),
    isMobile: vw.isMobile(sizes),
    isTablet: vw.isTablet(sizes),
    isDesktop: vw.isDesktop(sizes),
    isDesktopWide: vw.isDesktopWide(sizes),
  }
});

const mapDispatchToProps = dispatch => {
  return {
    actions: {
      initAnalysis: (property) => dispatch(
        actionCreators.initAnalysis(property),
      ),
      getProperties: () => dispatch(
        actionCreators.getProperties(),
      ),
      getProperty: (uuid) => dispatch(
        actionCreators.getProperty(uuid),
      ),
      setProperty: (property) => dispatch(
        actionCreators.setProperty(property),
      ),
      setModifierForm: (value) => dispatch(
        actionCreators.setModifierForm(value),
      ),
      setOfferPrice: (value) => dispatch(
        actionCreators.setOfferPrice(value),
      ),
      setDownPayment: (value) => dispatch(
        actionCreators.setDownPayment(value),
      ),
      setDownPaymentPercent: (value) => dispatch(
        actionCreators.setDownPaymentPercent(value),
      ),
      calculateDownPayment: () => dispatch(
        actionCreators.calculateDownPayment(),
      ),
      calculateLoanAmount: () => dispatch(
        actionCreators.calculateLoanAmount(),
      ),
      calculateTotalCashNeeded: () => dispatch(
        actionCreators.calculateTotalCashNeeded(),
      ),
      updatePurchaseCostItem: (value) => dispatch(
        actionCreators.updatePurchaseCostItem(value),
      ),
      addPurchaseCostItem: () => dispatch(
        actionCreators.addPurchaseCostItem(),
      ),
      deletePurchaseCostItem: (value) => dispatch(
        actionCreators.deletePurchaseCostItem(value),
      ),
      reorderItemizedPurchaseCosts: (value) => dispatch(
        actionCreators.reorderItemizedPurchaseCosts(value),
      ),
    },
  };
};

@withSizes(mapSizesToProps)
@connect(mapStateToProps, mapDispatchToProps)
class PropertyAnalysis extends Component {

  componentDidMount() {
    // console.log('[PropertyAnalysis.jsx] componentDidMount', this.props);
    this.props.actions.getProperties();

    // On page load:
    //  if a uuid exists in the (hash) path:
    //    Set the active property in the Properties Listing
    //    Set the Property in the Property Store
    //    Initialize the Analysis with the Property set previously
    //    Set the proper slide to be active
    const [uuid, formComponent] = this.props.location.pathname.split("/").filter(function(el) {return el.length != 0});
    if(uuid) {
      // TODO: instead of pulling, get this property from the properties feed
      // this.props.actions.getProperty(uuid);
    }
  }

  componentDidUpdate() {
    // console.log('[PropertyAnalysis.jsx] componentDidUpdate', this.props);
  }

  render() {
    // console.log('[PropertyAnalysis.jsx] render', this.props);

    return (
      <div className="container-fluid">
        {/*<h1>{this.props.state.analysis.data.title}</h1>*/}
        <div className="row">

          {/*<Zillow />*/}

          <div className="col-12">
            <Layout {...this.props}/>
          </div>

        </div>
      </div>
    );
  }
}

export default (PropertyAnalysis);
