import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const FormInput = ({
  errorMessage,
  onChange,
  info,
  name,
  placeholder,
  type,
  value
}) => (
  <div className="form-group">
    <input
      type={type}
      className={classNames('form-control form-control-lg', {
        'is-invalid': errorMessage
      })}
      placeholder={placeholder}
      name={name}
      value={value}
      onChange={onChange}
      autoComplete={type === 'password' ? 'current-password' : ''}
    />
    {info && <small className="form-text text-muted">{info}</small>}
    {errorMessage && <div className="invalid-feedback">{errorMessage}</div>}
  </div>
);

FormInput.propTypes = {
  errorMessage: PropTypes.string,
  info: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  type: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  disabled: PropTypes.string
};

FormInput.defaultProps = {
  type: 'text'
};

export default FormInput;
