import React from 'react';
import PropTypes from 'prop-types';

export default function CallingButton(props) {
  return (
    <button className={props.className} onClick={props.click}>
      <i />
      {props.children}
    </button>
  );
}

CallingButton.propTypes = {
  children: PropTypes.string,
  click: PropTypes.func.isRequired,
  className: PropTypes.string,
};

CallingButton.defaultProps = {
  children: '',
  className: '',
};
