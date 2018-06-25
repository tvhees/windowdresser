import React from 'react';
import PropTypes from 'prop-types';

export default function ImagePreview(props) {
  return (
    <div>
      <img className={`image-${props.type}`} src={props.src} alt={props.src} />
      {/* <input type="file" style={{ display: 'none' }} /> */}
    </div>
  );
}

ImagePreview.propTypes = {
  src: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
};

ImagePreview.defaultProps = {
  className: '',
};
