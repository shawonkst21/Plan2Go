interface Props {
  onEmailChange: (value: string) => void;
  onPasswordChange: (value: string) => void;
}

const Credentials = ({ onEmailChange, onPasswordChange }: Props) => {
  return (
    <form className="mb-4">
      <input
        type="email"
        className="form-control mb-3"
        id="exampleFormControlInput1"
        placeholder="email@example.com"
        onChange={(e) => onEmailChange(e.target.value)}
      />
      <input
        type="password"
        id="inputPassword5"
        className="form-control"
        aria-describedby="passwordHelpBlock"
        placeholder="password"
        onChange={(e) => onPasswordChange(e.target.value)}
      />
    </form>
  );
};

export default Credentials;
