import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const SelectListGroup = ({
  errorMessage,
  onChange,
  info,
  name,
  options,
  value
}) => {
  const selectOptions = options.map(option => (
    <option key={option.label} value={option.value}>
      {option.label}
    </option>
  ));
  return (
    <div className="form-group">
      <select
        className={classNames('form-control form-control-lg', {
          'is-invalid': errorMessage
        })}
        name={name}
        value={value}
        onChange={onChange}
      >
        {selectOptions}
      </select>
      {info && <small className="form-text text-muted">{info}</small>}
      {errorMessage && <div className="invalid-feedback">{errorMessage}</div>}
    </div>
  );
};

SelectListGroup.propTypes = {
  errorMessage: PropTypes.string,
  info: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  options: PropTypes.array.isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired
};

export default SelectListGroup;
