const CLIENT_ID =
  "462925763517-q1ngq5eoanrahnl1qkfkl33411i2alru.apps.googleusercontent.com";

let tokenClient = null;

export function initializeGoogleAuth(onSuccess) {
  if (!window.google) {
    alert("Google Identity Services not loaded.");
    return;
  }

  tokenClient = window.google.accounts.oauth2.initTokenClient({
    client_id: CLIENT_ID,

    scope:
      "https://www.googleapis.com/auth/contacts",

    callback: (response) => {
      if (response.access_token) {
        localStorage.setItem(
          "accessToken",
          response.access_token
        );

        onSuccess(response.access_token);
      }
    },
  });
}

export function loginGoogle() {
  if (!tokenClient) {
    alert("Google Auth not initialized.");
    return;
  }

  tokenClient.requestAccessToken();
}