import { useState, useEffect } from "react";
import { FaLink } from "react-icons/fa";

import { extractSheetId } from "../utils/extractSheetId";
import { readGoogleSheet } from "../services/googleSheet";

export default function SheetInput({
  onSheetLoaded,
  selectedSheet,
}) {
  const [sheetUrl, setSheetUrl] = useState("");

  useEffect(() => {
    if (selectedSheet) {
      setSheetUrl(selectedSheet.url);
      handleReadSheet(selectedSheet.url);
    }
  }, [selectedSheet]);

  const handleReadSheet = async (url = sheetUrl) => {
    if (!url.trim()) {
      alert("Please enter a Google Sheet URL.");
      return;
    }

    const sheetId = extractSheetId(url);

    if (!sheetId) {
      alert("Invalid Google Sheet URL.");
      return;
    }

    // Get logged-in user
    const user = JSON.parse(localStorage.getItem("googleUser"));

    if (!user?.accessToken) {
      alert("Please sign in with Google first.");
      return;
    }

    try {
      const data = await readGoogleSheet(
        sheetId,
        user.accessToken
      );

      onSheetLoaded(data.headers, data.rows);

    } catch (error) {
      console.error(error);

      if (error.response?.status === 403) {
        alert(
          "You don't have permission to access this Google Sheet."
        );
      } else if (error.response?.status === 401) {
        alert(
          "Your Google session has expired. Please sign in again."
        );

        localStorage.removeItem("googleUser");
        window.location.reload();
      } else {
        alert("Unable to read Google Sheet.");
      }
    }
  };

  return (
    <div className="bg-white rounded-3xl shadow-sm border border-slate-200 p-8">

      <h2 className="text-2xl font-bold text-slate-800">
        Google Sheet
      </h2>

      <p className="text-slate-500 mt-2">
        Paste your Google Sheet URL below.
      </p>

      <div className="mt-8 flex items-center gap-4">

        <div className="flex items-center w-full border border-slate-300 rounded-2xl px-5 py-4">

          <FaLink className="text-slate-400 mr-3" />

          <input
            type="text"
            value={sheetUrl}
            onChange={(e) => setSheetUrl(e.target.value)}
            placeholder="https://docs.google.com/spreadsheets/d/..."
            className="w-full outline-none text-slate-700 placeholder:text-slate-400"
          />

        </div>

        <button
          onClick={() => handleReadSheet()}
          className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-2xl transition duration-300 whitespace-nowrap"
        >
          Read Sheet
        </button>

      </div>

      <div className="mt-6 bg-slate-50 border border-slate-200 rounded-2xl p-4">

        <p className="text-sm text-slate-500">
          Supported Format
        </p>

        <p className="mt-2 font-medium text-slate-700">
          Private Google Sheets (Google Login Required)
        </p>

      </div>

    </div>
  );
}