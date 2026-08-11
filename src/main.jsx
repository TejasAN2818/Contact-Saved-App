import React from "react";
import ReactDOM from "react-dom/client";

import { GoogleOAuthProvider } from "@react-oauth/google";

import App from "./App";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>

    <GoogleOAuthProvider
      clientId="462925763517-q1ngq5eoanrahnl1qkfkl33411i2alru.apps.googleusercontent.com"
    >
      <App />
    </GoogleOAuthProvider>

  </React.StrictMode>
);