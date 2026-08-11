import GoogleLoginComponent from "../components/GoogleLogin";

export default function Login({ onLogin }) {
  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center px-6">

      <div className="bg-white rounded-3xl shadow-xl p-10 w-full max-w-md">

        <div className="text-center">

          <img
            src="https://www.gstatic.com/images/branding/product/2x/contacts_96dp.png"
            alt="Google Contacts"
            className="w-20 h-20 mx-auto mb-5"
          />

          <h1 className="text-3xl font-bold text-slate-800">
            Google Contact Sync
          </h1>

          <p className="text-slate-500 mt-3">
            Sign in with Google to access your private Google Sheets.
          </p>

        </div>

        <div className="mt-10">

          <GoogleLoginComponent
            onLogin={onLogin}
          />

        </div>

      </div>

    </div>
  );
}