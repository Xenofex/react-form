import React, { useState, useContext } from "react";
import PropTypes from "prop-types";
import { BoundContext } from "./Form";

export function Select({
  value: defaultValue,
  title,
  name,
  validations = [],
  options
}) {
  const { boundObject, onBoundObjectChange } = useContext(BoundContext);
  const [error, setError] = useState(null);
  const [value, setValue] = useState(defaultValue || boundObject[name]);
  const [changed, setChanged] = useState(false);

  const onChange = ({ currentTarget }) => {
    const { value } = currentTarget;
    setValue(value);
    setChanged(true);
    boundObject[name] = value;
    onBoundObjectChange(boundObject);

    const errors = [];

    validations.forEach((validation) => {
      const e = validation(value);
      if (e) {
        errors.push(e);
      }
    });

    if (errors.length > 0) {
      setError(errors.join(", "));
    } else {
      setError(null);
    }
  };

  return (
    <div className="form-control">
      <label className="form-label" htmlFor={"label-" + title}>
        {title || name}
      </label>
      <select value={value} onChange={onChange}>
        {options.map(({ name, value: val }) => (
          <option key={val} val={val}>
            {name}
          </option>
        ))}
      </select>
      {changed && error && <div className="form-error">{error}</div>}
    </div>
  );
}

Select.propTypes = {
  options: PropTypes.arrayOf(
    PropTypes.exact({
      name: PropTypes.string.isRequired,
      value: PropTypes.string.isRequired
    })
  )
};
