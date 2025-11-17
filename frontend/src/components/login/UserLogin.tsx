import { useEffect, useState } from "react";
import NameForm from "./NameForm";
import Credentials from "./Credentials";
import LoginButton from "./SubmitButton";

interface Props {
  onValidUID: (uid: string) => void;
  onValidToken: (token: string) => void;
}

const UserLogin = ({ onValidUID, onValidToken }: Props) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const attemptLogin = async () => {
    const res = await fetch("http://localhost:8080/users/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    });

    const data = await res.json();
    if (data.message) onValidUID(data.message);
    if (data.token) onValidToken(data.token);
  };
  return (
    <>
      <NameForm
        onFirstNameChange={setFirstName}
        onLastNameChange={setLastName}
      />
      <Credentials onEmailChange={setEmail} onPasswordChange={setPassword} />
      <LoginButton
        onLogin={() => {
          attemptLogin();
        }}
        onRegistration={() => {
          //todo
        }}
      />
    </>
  );
};

export default UserLogin;
