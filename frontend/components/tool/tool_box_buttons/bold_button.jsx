import React from 'react';

const BoldButton = (props) => {
  return (
      <li
        className={props.active ? "style-group-item style-type-bold" : "style-group-item style-type-bold active-style"}
        onClick={props.toggleStyle}>
      </li>
  )
};

export default BoldButton;
