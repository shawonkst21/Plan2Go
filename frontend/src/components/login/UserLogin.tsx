import { useEffect, useState } from "react";
import NameForm from "./NameForm";

const UserLogin = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  useEffect(() => {
    console.log(firstName, lastName);
  }, [firstName, lastName]);
  return (
    <>
      <NameForm
        onFirstNameChange={setFirstName}
        onLastNameChange={setLastName}
      />
    </>
  );
};

export default UserLogin;
