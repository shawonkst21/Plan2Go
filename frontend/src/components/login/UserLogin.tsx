import { useEffect, useState } from "react";
import NameForm from "./NameForm";

const UserLogin = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  useEffect(() => {
    console.log(firstName);
  }, [firstName, lastName]);
  return (
    <>
      <NameForm
        onFirstNameChange={(value: string) => setFirstName(value)}
        onLastNameChange={(value: string) => setLastName(value)}
      />
    </>
  );
};

export default UserLogin;
