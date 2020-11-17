import React from "react";
import PropTypes from "prop-types";
import { Input } from "./Input";

function Select({
  value: defaultValue,
  title,
  name,
  validations = [],
  options
}) {
  return (
    <Input {...{ defaultValue, title, name, validations }}>
      {({ value, onChange }) => (
        <select value={value} onChange={onChange}>
          {options.map(({ name, value: val }) => (
            <option key={val} val={val}>
              {name}
            </option>
          ))}
        </select>
      )}
    </Input>
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

export { Select };
