import { generateGoogleContactsCSV } from "../utils/generateCSV";

export default function DownloadCSV({ contacts }) {
  const handleDownload = () => {
    if (!contacts || contacts.length === 0) {
      alert("No contacts available.");
      return;
    }

    generateGoogleContactsCSV(contacts);
  };

  return (
    <div className="bg-white rounded-3xl shadow-sm border border-slate-200 p-8 mt-8">

      <h2 className="text-2xl font-bold text-slate-800">
        Export Contacts
      </h2>

      <p className="text-slate-500 mt-2">
        Download a Google Contacts compatible CSV file.
      </p>

      <button
        onClick={handleDownload}
        className="mt-6 bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-2xl transition-all"
      >
        📥 Download Google Contacts CSV
      </button>

      <p className="text-sm text-slate-400 mt-4">
        Total Contacts : {contacts.length}
      </p>

    </div>
  );
}