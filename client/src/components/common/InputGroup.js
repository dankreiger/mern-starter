import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const InputGroup = ({
  errorMessage,
  onChange,
  icon,
  name,
  type,
  placeholder,
  value
}) => (
  <div className="input-group mb-3">
    <div className="input-group-prepend">
      <span className="input-group-text">
        <i className={icon} />
      </span>
    </div>
    <input
      className={classNames('form-control form-control-lg', {
        'is-invalid': errorMessage
      })}
      placeholder={placeholder}
      name={name}
      value={value}
      onChange={onChange}
    />
    {errorMessage && <div className="invalid-feedback">{errorMessage}</div>}
  </div>
);

InputGroup.propTypes = {
  errorMessage: PropTypes.string,
  icon: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  type: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired
};

InputGroup.defaultProps = {
  type: 'text'
};

export default InputGroup;
