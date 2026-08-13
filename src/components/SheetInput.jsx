import { useEffect, useState } from "react";
import { FaLink, FaSpinner, FaCheckCircle } from "react-icons/fa";

import { extractSheetId } from "../utils/extractSheetId";
import { readGoogleSheet } from "../services/googleSheet";

export default function SheetInput({
  onSheetLoaded,
  selectedSheet,
}) {
  const [sheetUrl, setSheetUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [loaded, setLoaded] = useState(false);

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

    const user = JSON.parse(
      localStorage.getItem("googleUser")
    );

    if (!user?.accessToken) {
      alert("Please sign in with Google first.");
      return;
    }

    setLoading(true);
    setLoaded(false);

    try {
      const data = await readGoogleSheet(
        sheetId,
        user.accessToken
      );

      onSheetLoaded(data.headers, data.rows);

      setLoaded(true);

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

    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-blue-300 rounded-2xl border border-blue-200 shadow-sm p-4">

      <div className="flex flex-col md:flex-row items-center gap-3">

        {/* ================= TITLE ================= */}

        <div className="flex items-center gap-3 md:min-w-[210px]">

          <div className="
            w-10
            h-10
            rounded-xl
            bg-blue-600
            flex
            items-center
            justify-center
            shadow-md
          ">
            <FaLink className="text-white text-sm" />
          </div>

          <div>

            <h2 className="text-sm font-bold text-slate-800">
              Google Sheet
            </h2>

            <p className="text-[10px] text-blue-900/70">
              Private Sheet Access
            </p>

          </div>

        </div>


        {/* ================= INPUT ================= */}

        <div className="
          flex
          items-center
          flex-1
          w-full
          bg-white
          border
          border-blue-200
          rounded-xl
          px-4
          py-2.5
          shadow-sm
          focus-within:border-blue-500
          focus-within:ring-4
          focus-within:ring-blue-100
          transition-all
        ">

          <FaLink className="text-blue-500 mr-3 text-sm flex-shrink-0" />

          <input
            type="text"
            value={sheetUrl}
            onChange={(e) => {
              setSheetUrl(e.target.value);
              setLoaded(false);
            }}
            placeholder="Paste Google Sheet Link..."
            className="
              w-full
              bg-transparent
              outline-none
              text-xs
              text-slate-700
              placeholder:text-slate-400
            "
          />

          {loaded && (
            <FaCheckCircle className="text-green-500 ml-2" />
          )}

        </div>


        {/* ================= BUTTON ================= */}

        <button
          onClick={() => handleReadSheet()}
          disabled={loading}
          className={`
            flex
            items-center
            justify-center
            gap-2
            min-w-[120px]
            px-6
            py-2.5
            rounded-xl
            text-xs
            font-semibold
            text-white
            shadow-md
            transition-all
            duration-200
            ${
              loading
                ? "bg-blue-400 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700 hover:-translate-y-0.5 hover:shadow-lg active:translate-y-0"
            }
          `}
        >

          {loading ? (
            <>
              <FaSpinner className="animate-spin" />
              Reading...
            </>
          ) : (
            <>
              <FaLink />
              Read Sheet
            </>
          )}

        </button>

      </div>

    </div>
  );
}