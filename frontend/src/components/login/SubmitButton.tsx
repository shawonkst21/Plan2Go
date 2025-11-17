interface Props {
  onLogin: () => void;
  onRegistration: () => void;
}

const SubmitButton = ({ onLogin, onRegistration }: Props) => {
  return (
    <div className="d-flex justify-content-between">
      <button className="btn btn-success" onClick={onLogin}>
        Login
      </button>
      <button className="btn btn-success" onClick={onRegistration}>
        Register
      </button>
    </div>
  );
};

export default SubmitButton;
