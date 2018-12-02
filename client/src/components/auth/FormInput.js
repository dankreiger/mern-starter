import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const FormInput = ({
  errorMessage,
  onChange,
  gravatarMessage,
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
    />
    <div className="invalid-feedback">{errorMessage}</div>
    {gravatarMessage && (
      <small className="form-text text-muted">
        This site uses Gravatar so if you want a profile image, use a Gravatar
        email
      </small>
    )}
  </div>
);

FormInput.propTypes = {
  errorMessage: PropTypes.object,
  gravatarMessage: PropTypes.bool,
  onChange: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  type: PropTypes.string,
  value: PropTypes.string
};

export default FormInput;
