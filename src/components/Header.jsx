export default function Header() {
  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-slate-200">

      <div className="max-w-7xl mx-auto h-20 px-6 flex items-center justify-between">

        {/* Logo */}
        <div>

          <h1 className="text-3xl font-bold tracking-tight text-slate-800">

            Google Contact Sync

          </h1>

          <p className="text-sm text-slate-500 mt-1">

            Import Google Sheet Contacts into Google Contacts

          </p>

        </div>

        {/* Login Button */}

        <button
          className="
          px-6
          py-3
          rounded-2xl
          bg-blue-600
          hover:bg-blue-700
          text-white
          font-medium
          transition-all
          duration-300
          shadow-lg
          hover:shadow-xl
          "
        >
          Google Login
        </button>

      </div>

    </header>
  );
}