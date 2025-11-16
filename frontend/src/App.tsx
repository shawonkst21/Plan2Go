import { useState } from "react";
import UserLogin from "./components/login/UserLogin";

const App = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <div style={{ padding: "20px", background: "#eee" }}>
          <UserLogin
            name={(firstName: string, lastName: string) => {
              setFirstName(firstName);
              setLastName(lastName);
            }}
          />
        </div>
      </div>
      {console.log(firstName, lastName)}
    </>
  );
};

export default App;
