import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { useState } from "react";
import ProductList from "./Components/ProductList/ProductList";
import LoginComp from "./Components/Common/Login/Login";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const onLogin = () => {
    setIsLoggedIn(true);
  };

  const onLogout = () => {
    setIsLoggedIn(false);
  };
  return (
    <div className="App" style={{ textAlign: "center" }}>
      {isLoggedIn === true ? (
        <ProductList onLogout={onLogout} />
      ) : (
        <LoginComp onLogin={onLogin} />
      )}
    </div>
  );
}

export default App;
