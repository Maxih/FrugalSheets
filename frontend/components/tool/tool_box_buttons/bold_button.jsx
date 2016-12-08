import React from 'react';

const BoldButton = (props) => {
  return (
      <li
        className={props.active ? "style-type-bold" : "style-type-bold active-style"}
        onClick={props.toggleStyle}>
      </li>
  )
};

export default BoldButton;
