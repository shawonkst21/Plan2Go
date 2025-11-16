import { useState, type ChangeEvent } from "react";
import NameForm from "./NameForm";

interface Props {
  name: (firstName: string, lastName: string) => void;
}
const UserLogin = ({ name }: Props) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  return (
    <>
      <NameForm
        onFirstNameChange={(e: ChangeEvent<HTMLInputElement>) =>
          setFirstName(e.target.value)
        }
        onLastNameChange={(e: ChangeEvent<HTMLInputElement>) =>
          setLastName(e.target.value)
        }
      />
      {name(firstName, lastName)}
    </>
  );
};

export default UserLogin;
