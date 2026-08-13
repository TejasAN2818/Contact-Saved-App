import quickSheets from "../services/quickSheets";
import { FaRocket, FaExternalLinkAlt } from "react-icons/fa";

export default function QuickSheets({
  onSelectSheet,
}) {
  return (
    <div className="mt-2 px-1 pb-2">

      {/* Header */}

      <div className="flex items-center justify-between mb-3">

        <div>

          <h2 className="text-sm font-bold text-slate-800">
            Quick Sheets
          </h2>

          <p className="text-[10px] text-blue-900/60 mt-0.5">
            Quickly access your saved sheets
          </p>

        </div>

        <span className="
          text-[9px]
          font-semibold
          bg-white
          text-green-600
          border
          border-green-100
          px-2
          py-1
          rounded-lg
        ">
          {quickSheets.length} Sheets
        </span>

      </div>


      {/* Cards */}

      <div className="flex gap-3 overflow-x-auto pb-2">

        {quickSheets.map((sheet) => (

          <div
            key={sheet.id}
            className="
              min-w-[185px]
              max-w-[185px]
              bg-white
              rounded-xl
              border
              border-green-100
              shadow-sm
              p-3
              flex-shrink-0
              hover:border-green-300
              hover:shadow-lg
              hover:-translate-y-1
              transition-all
              duration-200
            "
          >

            {/* Sheet info */}

            <div className="flex items-center gap-2">

              {/* Google Sheets Logo */}

              <div className="
                w-9
                h-9
                rounded-lg
                bg-green-50
                border
                border-green-100
                flex
                items-center
                justify-center
              ">

                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                >

                  <path
                    d="M6 2.5C4.9 2.5 4 3.4 4 4.5V19.5C4 20.6 4.9 21.5 6 21.5H18C19.1 21.5 20 20.6 20 19.5V7.5L15 2.5H6Z"
                    fill="#34A853"
                  />

                  <path
                    d="M15 2.5V7.5H20"
                    fill="#B7E1CD"
                  />

                  <path
                    d="M7 10H17M7 13H17M7 16H17M10 9V18M14 9V18"
                    stroke="white"
                    strokeWidth="1.2"
                  />

                </svg>

              </div>


              {/* Name */}

              <div className="min-w-0 flex-1">

                <h3
                  className="text-xs font-semibold text-slate-800 truncate"
                  title={sheet.name}
                >
                  {sheet.name}
                </h3>

                <p className="text-[9px] text-green-600 mt-0.5">
                  Google Sheet
                </p>

              </div>

            </div>


            {/* Scan */}

            <button
              onClick={() => onSelectSheet(sheet)}
              className="
                mt-3
                w-full
                bg-green-600
                hover:bg-green-700
                text-white
                rounded-lg
                py-2
                text-[10px]
                font-semibold
                flex
                justify-center
                items-center
                gap-2
                shadow-sm
                hover:shadow-md
                transition-all
                duration-200
              "
            >
              <FaRocket className="text-[9px]" />
              Scan Sheet
              <FaExternalLinkAlt className="text-[8px]" />
            </button>

          </div>

        ))}

      </div>

    </div>
  );
}