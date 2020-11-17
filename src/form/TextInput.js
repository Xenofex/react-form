import React from "react";
import { Input } from "./Input";

function TextInput({ value: defaultValue, title, name, validations }) {
  return (
    <Input {...{ defaultValue, title, name, validations }}>
      {({ value, onChange }) => (
        <input value={value || ""} onChange={onChange} />
      )}
    </Input>
  );
}

export { TextInput };
