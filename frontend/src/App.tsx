import { useEffect, useState } from "react";
import UserLogin from "./components/login/UserLogin";

const App = () => {
  const [token, setToken] = useState("");
  const [uid, setUid] = useState("");

  useEffect(() => {
    console.log(token, uid);
  }, [token, uid]);
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
          <UserLogin onValidUID={setUid} onValidToken={setToken} />
        </div>
      </div>
    </>
  );
};

export default App;
