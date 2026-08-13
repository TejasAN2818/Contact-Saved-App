import { useState } from "react";
import {
  FaDownload,
  FaSpinner,
  FaCheck,
} from "react-icons/fa";

import { generateGoogleContactsCSV } from "../utils/generateCSV";

export default function DownloadCSV({
  contacts = [],
}) {

  const [loading, setLoading] = useState(false);
  const [downloaded, setDownloaded] = useState(false);


  const handleDownload = async () => {

    if (contacts.length === 0) {
      alert("No contacts available.");
      return;
    }

    setLoading(true);
    setDownloaded(false);

    // Small delay for visual feedback
    await new Promise((resolve) =>
      setTimeout(resolve, 700)
    );

    generateGoogleContactsCSV(contacts);

    setLoading(false);
    setDownloaded(true);

    setTimeout(() => {
      setDownloaded(false);
    }, 2500);
  };


  return (
    <div className="
    flex
      mt-4
    
  
      rounded-2xl
      p-3

      justify-center
  
    ">


      {/* Download Button */}

      <button
        onClick={handleDownload}
        disabled={loading}
        className={`
          flex
          items-center
          justify-center
          gap-2
          min-w-[150px]
          px-5
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
              ? "bg-green-400 cursor-not-allowed"
              : downloaded
              ? "bg-blue-600"
              : "bg-green-600 hover:bg-green-700 hover:-translate-y-0.5 hover:shadow-lg active:translate-y-0"
          }
        `}
      >

        {loading ? (
          <>
            <FaSpinner className="animate-spin" />
            Preparing...
          </>
        ) : downloaded ? (
          <>
            <FaCheck />
            Downloaded
          </>
        ) : (
          <>
            <FaDownload />
            Download CSV File
          </>
        )}

      </button>

    </div>
  );
}