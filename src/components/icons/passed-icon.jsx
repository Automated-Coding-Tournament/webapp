import React from 'react';
import IconBase from './icon-base';

const PassedIcon = (props) => {
    return (
      <IconBase {...props}>
        <path
          d='M0 0h24v24H0V0z'
          fill='none'
          />
          <path d='M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z' />
        </IconBase>
      );
    };
  
  export default PassedIcon;
  