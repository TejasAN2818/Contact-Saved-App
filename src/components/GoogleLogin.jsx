import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";

export default function GoogleLoginComponent({ onLogin }) {
  const login = useGoogleLogin({
    scope: "https://www.googleapis.com/auth/spreadsheets.readonly",

    onSuccess: async (tokenResponse) => {
      try {
        // Get user profile
        const { data } = await axios.get(
          "https://www.googleapis.com/oauth2/v3/userinfo",
          {
            headers: {
              Authorization: `Bearer ${tokenResponse.access_token}`,
            },
          }
        );

        const userData = {
          name: data.name,
          email: data.email,
          picture: data.picture,
          accessToken: tokenResponse.access_token,
        };

        localStorage.setItem(
          "googleUser",
          JSON.stringify(userData)
        );

        onLogin(userData);
      } catch (error) {
        console.error(error);
        alert("Unable to fetch Google profile.");
      }
    },

    onError: () => {
      alert("Google Login Failed");
    },
  });

  return (
    <div className="flex justify-center">
      <button
        onClick={() => login()}
        className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-2xl font-semibold transition"
      >
        Continue with Google
      </button>
    </div>
  );
}