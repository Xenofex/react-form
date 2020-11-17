import React, { createContext } from "react";

const BoundContext = createContext(null);

function Form({ bind: boundObject, children, onChange: onBoundObjectChange }) {
  let idPrefix = Math.random().toString(36).substring(7);

  return (
    <BoundContext.Provider
      value={{ boundObject, onBoundObjectChange, idPrefix }}
    >
      <div className="form">{children}</div>
    </BoundContext.Provider>
  );
}

export { Form, BoundContext };
