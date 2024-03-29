import React from 'react';
import IconBase from './icon-base';

const ArrowRightIcon = (props) => {
  return (
    <IconBase {...props}>
      <path
        d='M0 0h24v24H0V0z'
        fill='none'
      />
      <path d='M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6-6-6z' />
    </IconBase>
  );
};

export default ArrowRightIcon;
