import React, { createContext } from "react";

const BoundContext = createContext(null);

function Form({ bind: boundObject, children, onChange: onBoundObjectChange }) {
  return (
    <BoundContext.Provider value={{ boundObject, onBoundObjectChange }}>
      <div className="form">{children}</div>
    </BoundContext.Provider>
  );
}

export { Form, BoundContext };
