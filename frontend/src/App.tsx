import UserLogin from "./components/login/UserLogin";

const App = () => {
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
          {/* work section */}
          <UserLogin />
        </div>
      </div>
    </>
  );
};

export default App;
