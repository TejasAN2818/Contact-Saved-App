export default function Footer() {
  return (
    <footer className="mt-16 border-t border-slate-200 bg-white">

      <div className="max-w-7xl mx-auto px-6 py-8 flex flex-col md:flex-row items-center justify-between">

        <div>

          <h2 className="font-semibold text-slate-800">
            Google Contact Sync
          </h2>

          <p className="text-sm text-slate-500 mt-1">
            Import Google Sheet contacts directly into Google Contacts.
          </p>

        </div>

        <p className="text-sm text-slate-400 mt-4 md:mt-0">
          © 2026 Pragati HR Solutions
        </p>

      </div>

    </footer>
  );
}