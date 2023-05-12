import React from 'react';
import { useTheme } from 'styled-components';

const IconBase = (props) => {
  const { height = 32, width = 32, color, children } = props;
  const theme = useTheme();
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      height={`${height}px`}
      width={`${width}px`}
      viewBox='0 0 24 24'
      fill={color || theme.colors.WarmWhite}
    >
      {children}
    </svg>
  );
};

export default IconBase;
