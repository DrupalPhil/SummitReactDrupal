import React from 'react';
import NumberFormat from 'react-number-format';

// Formats number value as 55,555
export const numberThousands = (value) => {
  console.log(value);
  return <NumberFormat
    thousandSeparator={true}
    renderText={value => {value.formattedValue}}
  />;
};

// Formats number value as $55,555
export const dollarFormat = (value) => {
  return <NumberFormat
    value={value}
    allowLeadingZeros={false}
    decimalScale={0}
    displayType={'text'}
    thousandSeparator={true}
    prefix={'$'}
  />;
};

// Formats number value as 55%
export const percentFormat = (value) => {
  return <NumberFormat
    value={value * 100}
    displayType={'text'}
    decimalScale={0}
    thousandSeparator={true}
    suffix={'%'}
  />;
};
