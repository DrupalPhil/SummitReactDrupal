import React, {Component} from 'react';

class Zillow extends Component {

  ROOT_URL = 'https://www.zillow.com/webservice/';
  // ROOT_URL = 'webservice/';
  ZWSID = 'X1-ZWz179js4u4c97_2uji4';

  get = (api) => {
    console.log(api);

    var requestOptions = {
      method: 'GET',
      redirect: 'follow',
    };

    const headers = {'Content-Type': 'application/json'};
    fetch(this.ROOT_URL + api + '.htm?zws-id=X1-ZWz179js4u4c97_2uji4&address=7406 Dickinben Dr&citystatezip=Summerfield, NC 27358&rentzestimate=true', {headers})
    .then(response => response.text())
    .then(result => console.log(this.ROOT_URL, result));

  };


  componentDidMount() {
    // console.log('[ColumnSummary.jsx] componentDidMount', this.props);
    this.get('GetSearchResults');
  }

  render() {
    return (
      <div>
        Zillow
      </div>
    );
  }
};

export default Zillow;
