import { useEffect, useState } from "react";
import {
  FaUsers,
  FaColumns,
  FaCheckCircle,
  FaTag,
} from "react-icons/fa";

export default function ContactSettings({
  rows = [],
  headers = [],
  mapping,
  contactTitle,
  onColumnSelected,
  onTitleChange,
}) {
  const [slColumn, setSlColumn] = useState("");
  const [nameColumn, setNameColumn] = useState("");
  const [phoneColumn, setPhoneColumn] = useState("");

  useEffect(() => {
    const saved = localStorage.getItem("columnMapping");

    if (saved) {
      try {
        const savedMapping = JSON.parse(saved);

        setSlColumn(savedMapping.sl || "");
        setNameColumn(savedMapping.name || "");
        setPhoneColumn(savedMapping.phone || "");
      } catch (error) {
        console.log(error);
      }
    }
  }, []);

  const handleContinue = () => {
    if (!slColumn || !nameColumn || !phoneColumn) {
      alert("Please select SL No, Name and Phone columns.");
      return;
    }

    const selected = {
      sl: slColumn,
      name: nameColumn,
      phone: phoneColumn,
    };

    localStorage.setItem(
      "columnMapping",
      JSON.stringify(selected)
    );

    onColumnSelected(selected);
  };

  return (
  <div className="mt-5">

    {/* ================= CONTACT SETTINGS MAIN SECTION ================= */}

    {headers.length > 0 && (

      <div className="rounded-2xl overflow-hidden shadow-sm border border-blue-200">

        {/* ================= BLUE HEADER ================= */}

        <div className="bg-blue-400 px-5 py-3">

          <div className="flex items-center justify-between">

            <div className="flex items-center gap-3">

              <div className="w-9 h-9 rounded-xl bg-blue-600 flex items-center justify-center shadow-sm">
                <FaColumns className="text-white text-sm" />
              </div>

              <div>
                <h2 className="text-lg font-bold text-slate-800">
                  Contact Settings
                </h2>

                <p className="text-[11px] text-blue-900/70">
                  Select columns and customize your contacts
                </p>
              </div>

            </div>

            {/* Selected Status */}

            <div className="hidden sm:flex items-center gap-2 bg-white/40 px-3 py-1.5 rounded-lg">

              <FaCheckCircle
                className={
                  mapping
                    ? "text-green-600 text-xs"
                    : "text-slate-500 text-xs"
                }
              />

              <span className="text-xs font-semibold text-slate-700">
                {mapping ? "Ready" : "Not Selected"}
              </span>

            </div>

          </div>

        </div>


        {/* ================= BLUE BODY ================= */}

        <div className="bg-blue-100 p-4">


          {/* ================= STATS ================= */}

          <div className="grid grid-cols-3 gap-2 mb-4">

            {/* Contacts */}

            <div className="bg-white/70 rounded-xl px-3 py-2 border border-blue-100">

              <div className="flex items-center gap-2">

                <div className="w-7 h-7 rounded-lg bg-blue-100 flex items-center justify-center">
                  <FaUsers className="text-blue-600 text-xs" />
                </div>

                <div>
                  <p className="text-[10px] text-slate-500">
                    Total Rows "(Contacts)"
                  </p>

                  <p className="text-base font-bold leading-tight text-slate-800">
                    {rows.length}
                  </p>
                </div>

              </div>

            </div>


            {/* Columns */}

            <div className="bg-white/70 rounded-xl px-3 py-2 border border-blue-100">

              <div className="flex items-center gap-2">

                <div className="w-7 h-7 rounded-lg bg-green-100 flex items-center justify-center">
                  <FaColumns className="text-green-600 text-xs" />
                </div>

                <div>
                  <p className="text-[10px] text-slate-500">
                    Columns
                  </p>

                  <p className="text-base font-bold leading-tight text-slate-800">
                    {headers.length}
                  </p>
                </div>

              </div>

            </div>


            {/* Selected */}

            <div className="bg-white/70 rounded-xl px-3 py-2 border border-blue-100">

              <div className="flex items-center gap-2">

                <div
                  className={`w-7 h-7 rounded-lg flex items-center justify-center ${
                    mapping
                      ? "bg-green-100"
                      : "bg-orange-100"
                  }`}
                >
                  <FaCheckCircle
                    className={`text-xs ${
                      mapping
                        ? "text-green-600"
                        : "text-orange-500"
                    }`}
                  />
                </div>

                <div>
                  <p className="text-[10px] text-slate-500">
                    Selected
                  </p>

                  <p className="text-base font-bold leading-tight text-slate-800">
                    {mapping ? "Yes" : "No"}
                  </p>
                </div>

              </div>

            </div>

          </div>


          {/* ================= COLUMN SELECTION ================= */}

          <div className="bg-blue-300 rounded-xl border border-blue-100 p-4">

            <div className="grid md:grid-cols-3 gap-3">


              {/* SL NO */}

              <div>

                <label className="text-[11px] font-semibold text-slate-600">
                  Select your Sl No Column
                </label>

                <select
                  value={slColumn}
                  onChange={(e) => setSlColumn(e.target.value)}
                  className="
                    w-full
                    mt-2
                    bg-white
                    border
                    border-slate-200
                    rounded-lg
                    px-3
                    py-2
                    text-xs
                    text-slate-700
                    outline-none
                    focus:border-blue-500
                    focus:ring-2
                    focus:ring-blue-100
                    transition-all
                  "
                >

                  <option value="">
                    Select SL No
                  </option>

                  {headers.map((header, index) => (
                    <option
                      key={`${header}-${index}`}
                      value={header}
                    >
                      {header}
                    </option>
                  ))}

                </select>

              </div>


              {/* NAME */}

              <div>

                <label className="text-[11px] font-semibold text-slate-600">
                  Select your Name Column
                </label>

                <select
                  value={nameColumn}
                  onChange={(e) => setNameColumn(e.target.value)}
                  className="
                    w-full
                    mt-2
                    bg-white
                    border
                    border-slate-200
                    rounded-lg
                    px-3
                    py-2
                    text-xs
                    text-slate-700
                    outline-none
                    focus:border-blue-500
                    focus:ring-2
                    focus:ring-blue-100
                    transition-all
                  "
                >

                  <option value="">
                    Select Name
                  </option>

                  {headers.map((header, index) => (
                    <option
                      key={`${header}-${index}`}
                      value={header}
                    >
                      {header}
                    </option>
                  ))}

                </select>

              </div>


              {/* PHONE */}

              <div>

                <label className="text-[11px] font-semibold text-slate-600">
                  Select your Phone No Column
                </label>

                <select
                  value={phoneColumn}
                  onChange={(e) => setPhoneColumn(e.target.value)}
                  className="
                    w-full
                    mt-2
                    bg-white
                    border
                    border-slate-200
                    rounded-lg
                    px-3
                    py-2
                    text-xs
                    text-slate-700
                    outline-none
                    focus:border-blue-500
                    focus:ring-2
                    focus:ring-blue-100
                    transition-all
                  "
                >

                  <option value="">
                    Select Phone
                  </option>

                  {headers.map((header, index) => (
                    <option
                      key={`${header}-${index}`}
                      value={header}
                    >
                      {header}
                    </option>
                  ))}

                </select>

              </div>

            </div>


            {/* ================= CONTACT TITLE ================= */}

            <div className="mt-3">

              <div className="flex items-center gap-2 mb-2">

                <div className="w-6 h-6 rounded-md bg-blue-100 flex items-center justify-center">
                  <FaTag className="text-blue-600 text-[10px]" />
                </div>

                <div>

                  <label className="text-xs font-semibold text-slate-700">
                    Contact Title
                  </label>

                  <span className="text-[10px] text-slate-800 ml-2">
                    Example   :-   1 Meghana ("Contact Title")
                  </span>

                </div>

              </div>

              <input
                type="text"
                value={contactTitle}
                onChange={(e) => {
                  onTitleChange(e.target.value);

                  localStorage.setItem(
                    "contactTitle",
                    e.target.value
                  );
                }}
                placeholder="Work Station"
                className="
                  w-full
                  bg-white
                  border
                  border-blue-200
                  rounded-lg
                  px-3
                  py-2
                  text-xs
                  text-slate-700
                  outline-none
                  placeholder:text-slate-400
                  focus:bg-white
                  focus:border-blue-500
                  focus:ring-2
                  focus:ring-blue-100
                  transition-all
                "
              />

            </div>


            {/* ================= BOTTOM ================= */}

            <div className="flex items-center justify-center mt-3">

              

              <button
                onClick={handleContinue}
                className="
                  bg-blue-600
                  hover:bg-blue-700
                  active:bg-blue-800
                  text-white
                  px-5
                  py-2
                  rounded-lg
                  text-xs
                  font-semibold
                  shadow-sm
                  transition-all
                "
              >
                Continue →
              </button>

            </div>

          </div>

        </div>

      </div>

    )}

  </div>
);
}