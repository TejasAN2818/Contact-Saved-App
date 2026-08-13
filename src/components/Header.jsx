import { FaGoogle, FaUserCircle, FaSignOutAlt } from "react-icons/fa";

export default function Header({ onLogout }) {
  return (
    <header className="sticky top-0 z-50 bg-blue-700 text-white shadow-lg">

      <div className="max-w-7xl mx-auto h-16 px-4 md:px-6 flex items-center justify-between gap-4">

        {/* Logo / Brand */}
        <div className="flex items-center gap-3">

          <div className="w-9 h-9 rounded-xl bg-white/15 border border-white/20 flex items-center justify-center">
            <FaGoogle className="text-lg text-white" />
          </div>

          <div>
            <h1 className="text-lg md:text-xl font-bold tracking-tight">
              Google Contact Sync
            </h1>

            <p className="text-xs text-blue-100 hidden sm:block">
              Import Google Sheet Contacts into Google Contacts
            </p>
          </div>

        </div>


        {/* Right Side */}
        <div className="flex items-center gap-2">

          {/* Connected Status */}
          <div className="hidden md:flex items-center gap-2 bg-white/10 border border-white/20 px-3 py-1.5 rounded-lg">

            <span className="w-2 h-2 bg-green-400 rounded-full"></span>

            <span className="text-xs font-medium">
              Connected
            </span>

          </div>


          {/* Google Account */}
          <div className="flex items-center gap-2 bg-white text-blue-700 px-3 py-2 rounded-xl shadow-md">

            <FaUserCircle className="text-base" />

            <span className="hidden sm:inline text-sm font-semibold">
              Google Account
            </span>

          </div>


          {/* Logout Button */}
          <button
            onClick={onLogout}
            className="
              flex
              items-center
              gap-2
              bg-red-500
              hover:bg-red-600
              active:bg-red-700
              text-white
              px-3
              py-2
              rounded-xl
              text-sm
              font-semibold
              shadow-md
              hover:shadow-lg
              transition-all
              duration-200
            "
          >

            <FaSignOutAlt />

            <span className="hidden sm:inline">
              Logout
            </span>

          </button>

        </div>

      </div>

    </header>
  );
}