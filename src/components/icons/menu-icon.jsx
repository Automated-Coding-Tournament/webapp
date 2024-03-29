import React from 'react';
import IconBase from './icon-base';

const MenuIcon = (props) => {
  return (
    <IconBase {...props}>
      <path
        d='M0 0h24v24H0V0z'
        fill='none'
      />
      <path d='M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z' />
    </IconBase>
  );
};

export default MenuIcon;
