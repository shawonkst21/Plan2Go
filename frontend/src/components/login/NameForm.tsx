interface Props {
  onFirstNameChange: (value: string) => void;
  onLastNameChange: (value: string) => void;
}

const NameForm = ({ onFirstNameChange, onLastNameChange }: Props) => {
  return (
    <div className="row g-3 mb-4">
      <div className="col">
        <input
          type="text"
          className="form-control"
          placeholder="First name"
          aria-label="First name"
          onChange={(e) => onFirstNameChange(e.target.value)}
        />
      </div>
      <div className="col">
        <input
          type="text"
          className="form-control"
          placeholder="Last name"
          aria-label="Last name"
          onChange={(e) => onLastNameChange(e.target.value)}
        />
      </div>
    </div>
  );
};

export default NameForm;
