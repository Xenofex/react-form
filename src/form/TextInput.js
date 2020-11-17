import React from "react";
import { Input } from "./Input";

function TextInput({ value: defaultValue, name, title = name, validations }) {
  return (
    <Input {...{ defaultValue, title, name, validations }}>
      {({ value, onChange }) => (
        <input
          className="form-input"
          id={"input-" + title}
          value={value || ""}
          onChange={onChange}
        />
      )}
    </Input>
  );
}

export { TextInput };
