import { useEffect, useState } from "react";

import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const savedUser = localStorage.getItem("googleUser");

    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const handleLogin = (userData) => {
    localStorage.setItem(
      "googleUser",
      JSON.stringify(userData)
    );

    setUser(userData);
  };

  const handleLogout = () => {
    localStorage.removeItem("googleUser");
    setUser(null);
  };

  if (!user) {
    return <Login onLogin={handleLogin} />;
  }

  return (
    <Dashboard
      user={user}
      onLogout={handleLogout}
    />
  );
}

export default App;