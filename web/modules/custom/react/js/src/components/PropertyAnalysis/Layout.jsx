import React, {Component, useState} from 'react';
import Swiper from 'react-id-swiper';
import 'swiper/css/swiper.css';
import ListGroupItems
  from './blocks/purchaseAndRehab/listGroupItems/ListGroupItems';
import SwitchControls from './blocks/purchaseAndRehab/controls/SwitchControls';
import PropertiesListing from '../PropertiesListing';
import {Route, Link, BrowserRouter as Router} from 'react-router-dom';
import ColumnSummary from './columnSummary/ColumnSummary';

const Layout = (props) => {
  // console.log('[Layout.jsx] render', props);

  const [swiper, setSwiper] = useState(null);

  const goNext = () => {
    if (swiper !== null) {
      swiper.slideNext();
    }
  };

  const goPrev = () => {
    if (swiper !== null) {
      swiper.slidePrev();
    }
  };

  const goToSlide = (idx) => {
    swiper.slideTo(+idx - (+swiper.params.slidesPerView - 1));
  };

  const params = {
    containerClass: 'analysis-swiper',
    grabCursor: true,
    loop: false,
    direction: 'horizontal',
    watchOverflow: true,
    slidesPerView: 1,
    noSwiping: true,
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true,
    },
    breakpoints: {
      480: {
        slidesPerView: 2,
      },
      960: {
        slidesPerView: 3,
      },
      1440: {
        slidesPerView: 4,
      },
      1920: {
        slidesPerView: 5,
      },
    },
  };

  return (
    <div>
      <h5>Properties Success: {props.state.properties.propertiesSuccess ?
        'True' :
        'False'}</h5>
      <h5>Property Success: {props.state.property.propertySuccess ?
        'True' :
        'False'}</h5>
      <h5>Analysis Success: {props.state.analysis.analysisSuccess ?
        'True' :
        'False'}</h5>
      <button onClick={goPrev}>Prev</button>
      <button onClick={goNext}>Next</button>
      <button onClick={() => goToSlide(0)}>Go To: 0</button>
      <button onClick={() => goToSlide(1)}>Go To: 1</button>
      <button onClick={() => goToSlide(2)}>Go To: 2</button>
      <Swiper
        getSwiper={setSwiper}
        {...params}
      >
        <div>
          <div>COLUMN 0</div>
          {
            props.state.properties.propertiesSuccess &&
            <PropertiesListing
              {...props}
              swiper={swiper}
              slideTo={(idx) => goToSlide(idx)}
            />
          }
        </div>
        <div>
          <div>COLUMN 1</div>
          <Route
            path="/:uuid"
            render={(route) => (
              <ColumnSummary
                {...props}
                swiper={swiper}
                slideTo={(idx) => goToSlide(idx)}
              />
            )}
          />
        </div>
        <div>
          <div>COLUMN 2</div>
          {
            props.state.analysis.modifierForm &&
            <SwitchControls
              {...props}
              slideTo={(idx) => goToSlide(idx)}
            />
          }
        </div>
        {/*{*/}
        {/*  props.sizes.isDesktopWide &&*/}
        {/*      <div>Slide 3</div>*/}
        {/*}*/}
        {/*{*/}
        {/*  props.sizes.isDesktopWide &&*/}
        {/*      <div>Slide 4</div>*/}
        {/*}*/}
      </Swiper>
    </div>
  );
};

export default Layout;
