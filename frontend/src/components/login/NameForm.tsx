import type { ChangeEvent } from "react";

interface Props {
  onFirstNameChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onLastNameChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

const NameForm = ({ onFirstNameChange, onLastNameChange }: Props) => {
  return (
    <div className="row g-3">
      <div className="col">
        <input
          type="text"
          className="form-control"
          placeholder="First name"
          aria-label="First name"
          onChange={onFirstNameChange}
        />
      </div>
      <div className="col">
        <input
          type="text"
          className="form-control"
          placeholder="Last name"
          aria-label="Last name"
          onChange={onLastNameChange}
        />
      </div>
    </div>
  );
};

export default NameForm;
