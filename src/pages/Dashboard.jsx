import { useState, useRef } from "react";

import Header from "../components/Header";
import Footer from "../components/Footer";
import SheetInput from "../components/SheetInput";


import ContactPreview from "../components/ContactPreview";

import QuickSheets from "../components/QuickSheets";
import DownloadCSV from "../components/DownloadCSV";

import ContactSettings from "../components/ContactSettings";

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

  const contactSettingsRef = useRef(null);
  const contactPreviewRef = useRef(null);

   const handleLogout = () => {

  const confirmLogout = window.confirm(
    "Are you sure you want to logout?"
  );

  if (!confirmLogout) {
    return;
  }

  // Remove Google session
  localStorage.removeItem("googleUser");

  // Optional: remove saved settings
  localStorage.removeItem("columnMapping");
  localStorage.removeItem("contactTitle");

  // Clear current application data
  setHeaders([]);
  setRows([]);
  setMapping(null);
  setContacts([]);
  setSelectedSheet(null);
  setContactTitle("");

  // Reload application
  window.location.reload();
};

  const smoothScrollTo = (element) => {
    if (!element) return;

    const headerOffset = 85;

    const startPosition = window.pageYOffset;

    const elementPosition =
      element.getBoundingClientRect().top +
      window.pageYOffset;

    const targetPosition =
      elementPosition - headerOffset;

    const distance = targetPosition - startPosition;

    // Scroll duration in milliseconds
    const duration = 700;

    let startTime = null;

    // Smooth easing
    const easeInOutCubic = (t) => {
      return t < 0.5
        ? 4 * t * t * t
        : 1 - Math.pow(-2 * t + 2, 3) / 2;
    };

    const animation = (currentTime) => {
      if (!startTime) {
        startTime = currentTime;
      }

      const elapsed = currentTime - startTime;

      const progress = Math.min(
        elapsed / duration,
        1
      );

      const easedProgress =
        easeInOutCubic(progress);

      window.scrollTo(
        0,
        startPosition +
        distance * easedProgress
      );

      if (progress < 1) {
        requestAnimationFrame(animation);
      }
    };

    requestAnimationFrame(animation);
  };

  const handleSheetLoaded = (headers, rows) => {
    setHeaders(headers);
    setRows(rows);

    setMapping(null);
    setContacts([]);

    setTimeout(() => {
      smoothScrollTo(contactSettingsRef.current);
    }, 50);
  };

  const handleColumnSelected = (selected) => {
    setMapping(selected);

    const builtContacts = buildContacts(
      rows,
      selected,
      contactTitle
    );

    setContacts(builtContacts);

    setTimeout(() => {
      smoothScrollTo(contactPreviewRef.current);
    }, 50);
  };

  const handleQuickSheet = (sheet) => {
    setSelectedSheet(sheet);
  };



  return (
    <div className="min-h-screen bg-slate-100">
      <Header onLogout={handleLogout} />

      <main className="max-w-7xl mx-auto px-4 md:px-6 py-6">

        {/* ================= SHEET AREA ================= */}

        <div className="
    bg-blue-200
    mt-2
    rounded-3xl
    p-3
    shadow-sm
  ">

          <SheetInput
            selectedSheet={selectedSheet}
            onSheetLoaded={handleSheetLoaded}
          />

          <QuickSheets
            onSelectSheet={handleQuickSheet}
          />

        </div>


        {/* ================= CONTACT AREA ================= */}

        <div className="
    bg-blue-200
    mt-5
    rounded-3xl
    p-3
    shadow-sm
  ">

          <div ref={contactSettingsRef}
            className="scroll-mt-24"
          >
            <ContactSettings
              rows={rows}
              headers={headers}
              mapping={mapping}
              contactTitle={contactTitle}
              onColumnSelected={handleColumnSelected}
              onTitleChange={setContactTitle}
            />
          </div>

          <div ref={contactPreviewRef}
            className="scroll-mt-24"
          >
            <ContactPreview
              contacts={contacts}
            />

            {contacts.length > 0 && (
              <DownloadCSV
                contacts={contacts}
              />
            )}
          </div>

        </div>

      </main>

      <Footer />

    </div>
  );
}