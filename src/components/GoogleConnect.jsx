import {
  initializeGoogleAuth,
  loginGoogle,
} from "../services/auth";

import { createContact } from "../services/googleContacts";
import { useEffect } from "react";

export default function GoogleConnect({
  contacts,
  importing,
  setImporting,
  progress,
  setProgress,
  successCount,
  setSuccessCount,
  failedCount,
  setFailedCount,
}) {
  useEffect(() => {
    initializeGoogleAuth(() => {
      alert("Google Connected");
    });
  }, []);

  const handleImport = async () => {
    if (contacts.length === 0) {
      alert("No contacts found.");
      return;
    }

    setImporting(true);
    setProgress(0);
    setSuccessCount(0);
    setFailedCount(0);

    for (let i = 0; i < contacts.length; i++) {
      try {
        await createContact(
          contacts[i].name,
          contacts[i].phone
        );

        setSuccessCount((prev) => prev + 1);
      } catch (e) {
        console.log(e);
        setFailedCount((prev) => prev + 1);
      }

      setProgress(i + 1);
    }

    setImporting(false);

    alert("Import Completed");
  };

  return (
    <div className="bg-white rounded-3xl shadow-sm border p-8 mt-8">

      <h2 className="text-2xl font-bold">
        Google Contacts
      </h2>

      <p className="mt-2 text-slate-500">
        Connect your account and import contacts.
      </p>

      <button
        onClick={loginGoogle}
        className="mt-6 bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-xl"
      >
        Connect Google
      </button>

      <button
        onClick={handleImport}
        disabled={importing}
        className="mt-4 ml-4 bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white px-8 py-4 rounded-xl"
      >
        {importing
          ? "Importing..."
          : `Import ${contacts.length} Contacts`}
      </button>

      <div className="mt-8">

        <div className="w-full bg-gray-200 rounded-full h-4">

          <div
            className="bg-green-600 h-4 rounded-full transition-all"
            style={{
              width: `${contacts.length
                ? (progress / contacts.length) * 100
                : 0}%`,
            }}
          />

        </div>

        <p className="mt-4">

          Progress :

          {" "}

          {progress}

          /

          {contacts.length}

        </p>

        <p>

          Imported :

          {" "}

          {successCount}

        </p>

        <p>

          Failed :

          {" "}

          {failedCount}

        </p>

      </div>

    </div>
  );
}