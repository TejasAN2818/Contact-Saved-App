import quickSheets from "../services/quickSheets";
import {
  FaStar,
  FaRocket,
} from "react-icons/fa";

export default function QuickSheets({
  onSelectSheet,
}) {
  return (
    <div className="mt-10">

      <h2 className="text-2xl font-bold text-slate-800 mb-5">
        ⭐ Quick Sheets
      </h2>

      <div className="flex gap-5 overflow-x-auto pb-3">

        {quickSheets.map((sheet) => (

          <div
            key={sheet.id}
            className="min-w-[280px] bg-white rounded-3xl shadow-md border border-slate-200 p-6 flex-shrink-0 hover:shadow-lg transition-all"
          >

            <div className="flex items-center gap-2">

              {sheet.favorite && (
                <FaStar className="text-yellow-500 text-lg" />
              )}

              <h3 className="text-xl font-bold text-slate-800">
                {sheet.name}
              </h3>

            </div>

            <button
              onClick={() => onSelectSheet(sheet)}
              className="mt-8 w-full bg-blue-600 hover:bg-blue-700 text-white rounded-2xl py-4 flex justify-center items-center gap-3 transition-all"
            >
              <FaRocket />
              Scan Sheet
            </button>

          </div>

        ))}

      </div>

    </div>
  );
}