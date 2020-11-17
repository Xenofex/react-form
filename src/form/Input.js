import React, { useState, useContext } from "react";
import { BoundContext } from "./Form";

function Input({ defaultValue, name, title = name, validations, children }) {
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
      <label className="form-label" htmlFor={"input-" + title}>
        {title}
      </label>
      {children({ value, onChange })}
      {changed && error && <div className="form-error">{error}</div>}
    </div>
  );
}

export { Input };
