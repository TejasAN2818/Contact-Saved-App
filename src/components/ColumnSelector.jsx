import { useEffect, useState } from "react";

export default function ColumnSelector({
  headers = [],
  onContinue,
}) {
  const [slColumn, setSlColumn] = useState("");
  const [nameColumn, setNameColumn] = useState("");
  const [phoneColumn, setPhoneColumn] = useState("");

  useEffect(() => {
    const saved = localStorage.getItem("columnMapping");

    if (saved) {
      try {
        const mapping = JSON.parse(saved);

        setSlColumn(mapping.sl || "");
        setNameColumn(mapping.name || "");
        setPhoneColumn(mapping.phone || "");
      } catch (e) {
        console.log(e);
      }
    }
  }, []);

  const handleContinue = () => {
    if (!slColumn || !nameColumn || !phoneColumn) {
      alert("Please select SL No, Name and Phone columns.");
      return;
    }

    localStorage.setItem(
      "columnMapping",
      JSON.stringify({
        sl: slColumn,
        name: nameColumn,
        phone: phoneColumn,
      })
    );

    onContinue({
      sl: slColumn,
      name: nameColumn,
      phone: phoneColumn,
    });
  };

  if (headers.length === 0) return null;

  return (
    <div className="bg-white rounded-3xl shadow-sm border border-slate-200 p-8 mt-8">

      <h2 className="text-2xl font-bold">
        Select Columns
      </h2>

      <p className="text-slate-500 mt-2">
        Choose the SL No, Name and Phone columns.
      </p>

      <div className="grid md:grid-cols-3 gap-6 mt-8">

        {/* SL NO */}

        <div>

          <label className="font-medium text-slate-700">
            SL No Column
          </label>

          <select
            className="w-full mt-3 border rounded-2xl p-4"
            value={slColumn}
            onChange={(e) => setSlColumn(e.target.value)}
          >
            <option value="">Select</option>

            {headers.map((header) => (
              <option key={header} value={header}>
                {header}
              </option>
            ))}

          </select>

        </div>

        {/* NAME */}

        <div>

          <label className="font-medium text-slate-700">
            Name Column
          </label>

          <select
            className="w-full mt-3 border rounded-2xl p-4"
            value={nameColumn}
            onChange={(e) => setNameColumn(e.target.value)}
          >
            <option value="">Select</option>

            {headers.map((header) => (
              <option key={header} value={header}>
                {header}
              </option>
            ))}

          </select>

        </div>

        {/* PHONE */}

        <div>

          <label className="font-medium text-slate-700">
            Phone Column
          </label>

          <select
            className="w-full mt-3 border rounded-2xl p-4"
            value={phoneColumn}
            onChange={(e) => setPhoneColumn(e.target.value)}
          >
            <option value="">Select</option>

            {headers.map((header) => (
              <option key={header} value={header}>
                {header}
              </option>
            ))}

          </select>

        </div>

      </div>

      <button
        onClick={handleContinue}
        className="mt-8 bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-2xl"
      >
        Continue
      </button>

    </div>
  );
}