import React from 'react';
import PropTypes from 'prop-types';

export default class PlatformSelect extends React.Component {
  constructor(props) {
    super(props);
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;
    const selection = Object.assign({}, this.props.state);
    selection[name] = value;
    this.props.handleSelection('platforms', selection);
  }

  render() {
    return (
      <form className={this.props.className}>
        {Object.keys(this.props.state).map(platform =>
          (<label key={platform} htmlFor={`checkbox-${platform}`}>
            {platform}
            <input
              id={`checkbox-${platform}`}
              name={platform}
              type="checkbox"
              checked={this.props.state[platform]}
              onChange={this.handleInputChange}
            />
          </label>),
        )}
      </form>
    );
  }
}

PlatformSelect.propTypes = {
  className: PropTypes.string,
  state: PropTypes.shape({}).isRequired,
  handleSelection: PropTypes.func.isRequired,
};

PlatformSelect.defaultProps = {
  className: '',
};
