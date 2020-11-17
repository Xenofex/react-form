import React, { useState } from "react";
import "./styles.css";
import { Form, TextInput, Validations } from "./form";

export default function App() {
  const defaultUser = {
    name: "Johnson"
  };
  const { present, email } = Validations;
  const [user, setUser] = useState(defaultUser);

  return (
    <div className="App">
      <h1>Hello CodeSandbox</h1>
      <h2>Start editing to see some magic happen!</h2>
      <Form bind={user} onChange={(user) => setUser(user)}>
        <TextInput name="name" validations={[present]} />
        <TextInput name="email" validations={[present, email]} />
        <button onClick={() => console.log("user: ", user)}>SUBMIT</button>
      </Form>
    </div>
  );
}
