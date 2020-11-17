import React, { useContext } from "react";
import PropTypes from "prop-types";
import { Input } from "./Input";
import { BoundContext } from "./Form";

function Radio({
  value: defaultValue,
  title,
  name,
  validations = [],
  options
}) {
  const { idPrefix } = useContext(BoundContext);

  return (
    <Input {...{ defaultValue, title, name, validations }}>
      {({ value, onChange }) => (
        <div className="form-input-group">
          {options.map((option) => {
            const inputId = `${idPrefix}-${name}-${option.value}`;
            const inputName = `${idPrefix}-${name}`;

            return (
              <div key={inputId} className="form-radio-option">
                <input
                  type="radio"
                  value={option.value}
                  name={inputName}
                  id={inputId}
                  checked={value === option.value}
                  onChange={onChange}
                />
                <label htmlFor={inputId}>{option.name}</label>
              </div>
            );
          })}
        </div>
      )}
    </Input>
  );
}

Radio.propTypes = {
  options: PropTypes.arrayOf(
    PropTypes.exact({
      name: PropTypes.string.isRequired,
      value: PropTypes.string.isRequired
    })
  )
};

export { Radio };
