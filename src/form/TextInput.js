import React, { useState, useContext } from "react";
import { BoundContext } from "./Form";

function TextInput({ value: defaultValue, title, name, validations }) {
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
      <input
        className="form-input"
        id={"label-" + title}
        type="text"
        value={value}
        onChange={onChange}
      />
      {changed && error && <div className="form-error">{error}</div>}
    </div>
  );
}

export { TextInput };
