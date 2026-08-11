import { useState } from "react";

import Header from "../components/Header";
import Footer from "../components/Footer";
import SheetInput from "../components/SheetInput";
import StatCard from "../components/StatCard";
import ColumnSelector from "../components/ColumnSelector";
import ContactPreview from "../components/ContactPreview";
import DownloadCSV from "../components/DownloadCSV";
import QuickSheets from "../components/QuickSheets";

import { buildContacts } from "../utils/buildContacts";

export default function Dashboard() {

  const [headers, setHeaders] = useState([]);
  const [rows, setRows] = useState([]);
  const [mapping, setMapping] = useState(null);
  const [contacts, setContacts] = useState([]);
  const [contactTitle, setContactTitle] = useState(
  localStorage.getItem("contactTitle") || ""
);
  const [selectedSheet, setSelectedSheet] = useState(null);

  const handleSheetLoaded = (headers, rows) => {
    setHeaders(headers);
    setRows(rows);
  };

  const handleColumnSelected = (selected) => {
  setMapping(selected);

  const builtContacts = buildContacts(
    rows,
    selected,
    contactTitle
  );

  setContacts(builtContacts);
};

  const handleQuickSheet = (sheet) => {
    setSelectedSheet(sheet);
  };

  return (
    <div className="min-h-screen bg-slate-100">

      <Header />

      <main className="max-w-7xl mx-auto px-6 py-10">

        <div className="mb-8">

          <h2 className="text-3xl font-bold">
            Dashboard
          </h2>

          <p className="text-slate-500 mt-2">
            Import Google Contacts from Google Sheet.
          </p>

        </div>

        {/* Google Sheet */}

        <SheetInput
          selectedSheet={selectedSheet}
          onSheetLoaded={handleSheetLoaded}
        />

        {/* Quick Sheets */}

        <QuickSheets
          onSelectSheet={handleQuickSheet}
        />

        {/* Stats */}

        <div className="grid md:grid-cols-3 gap-6 mt-8">

          <StatCard
            title="Contacts"
            value={rows.length}
            color="blue"
          />

          <StatCard
            title="Columns"
            value={headers.length}
            color="green"
          />

          <StatCard
            title="Selected"
            value={mapping ? "Yes" : "No"}
            color="orange"
          />

        </div>

        {/* Column Selection */}

        <ColumnSelector
          headers={headers}
          onContinue={handleColumnSelected}
        />

        <div className="bg-white rounded-3xl shadow-sm border border-slate-200 p-8 mt-8">

  <h2 className="text-2xl font-bold">
    Contact Title
  </h2>

  <p className="text-slate-500 mt-2">
    This title will be added to every contact.
  </p>

  <input
    type="text"
    placeholder="Example : Work Station"
    value={contactTitle}
    onChange={(e) => {
      setContactTitle(e.target.value);
      localStorage.setItem("contactTitle", e.target.value);
    }}
    className="mt-6 w-full border rounded-2xl p-4 outline-none"
  />

</div>

        {/* Preview */}

        <ContactPreview
          contacts={contacts}
        />

        {/* Download */}

        <DownloadCSV
          contacts={contacts}
        />

      </main>

      <Footer />

    </div>
  );
}