import React, { createContext, useState, useContext } from "react";
import PropTypes from "prop-types";

const BoundContext = createContext(null);

function Form({ bind: boundObject, children, onChange: onBoundObjectChange }) {
  return (
    <BoundContext.Provider value={{ boundObject, onBoundObjectChange }}>
      <div className="form">{children}</div>
    </BoundContext.Provider>
  );
}

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

function Select({
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
      <select onChange={onChange}>
        {options.map(({ name, value: val }) => (
          <option selected={value === val && "selected"} val={val}>
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

const Validations = {
  present(value) {
    if (!value) {
      return "不能为空";
    }
  },

  email(value) {
    if (
      !/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(
        value
      )
    ) {
      return "电子邮件格式不正确";
    }
  }
};

export { Form, TextInput, Select, Validations };
