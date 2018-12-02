import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const TextAreaFieldGroup = ({
  errorMessage,
  onChange,
  info,
  name,
  placeholder,
  value
}) => (
  <div className="form-group">
    <textarea
      className={classNames('form-control form-control-lg', {
        'is-invalid': errorMessage
      })}
      placeholder={placeholder}
      name={name}
      value={value}
      onChange={onChange}
    />
    {info && <small className="form-text text-muted">{info}</small>}
    {errorMessage && <div className="invalid-feedback">{errorMessage}</div>}
  </div>
);

TextAreaFieldGroup.propTypes = {
  errorMessage: PropTypes.string,
  info: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  value: PropTypes.string.isRequired
};

export default TextAreaFieldGroup;
