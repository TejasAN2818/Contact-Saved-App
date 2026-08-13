export default function ContactPreview({ contacts = [] }) {
  if (contacts.length === 0) return null;

  return (
    <div className="
      bg-white
      rounded-2xl
      shadow-sm
      border
      border-blue-200
      overflow-hidden
      mt-4
    ">

      {/* ================= HEADER ================= */}

      <div className="
        bg-blue-400
        px-4
        py-3
        flex
        items-center
        justify-between
      ">

        <div className="flex items-center gap-3">

          <div className="
            w-8
            h-8
            rounded-lg
            bg-blue-600
            flex
            items-center
            justify-center
            shadow-sm
          ">
            <span className="text-white text-sm">
              👥
            </span>
          </div>

          <div>

            <h2 className="text-sm font-bold text-slate-800">
              Contact Preview
            </h2>

            <p className="text-[9px] text-blue-900/70">
              First 20 contacts
            </p>

          </div>

        </div>


        {/* Count */}

        <div className="
          bg-white/70
          border
          border-white/60
          rounded-lg
          px-3
          py-1
          text-center
        ">

          <span className="text-[9px] text-slate-500">
            Valid
          </span>

          <span className="ml-1 text-sm font-bold text-blue-600">
            {contacts.length}
          </span>

        </div>

      </div>


      {/* ================= TABLE ================= */}

      <div className="p-3 bg-blue-50">

        <div className="
          overflow-auto
          max-h-[220px]
          rounded-xl
          border
          border-blue-100
          bg-white
          shadow-sm
        ">

          <table className="w-full text-[11px]">

            <thead className="
              bg-blue-100
              sticky
              top-0
              z-10
            ">

              <tr>

                <th className="
                  text-left
                  px-3
                  py-2
                  w-10
                  font-semibold
                  text-slate-600
                ">
                  #
                </th>

                <th className="
                  text-left
                  px-3
                  py-2
                  font-semibold
                  text-slate-600
                ">
                  Name
                </th>

                <th className="
                  text-left
                  px-3
                  py-2
                  font-semibold
                  text-slate-600
                ">
                  Phone
                </th>

              </tr>

            </thead>


            <tbody>

              {contacts.slice(0, 20).map((contact, index) => (

                <tr
                  key={`${contact.phone}-${index}`}
                  className="
                    border-t
                    border-slate-100
                    hover:bg-blue-50
                    transition-colors
                  "
                >

                  <td className="px-3 py-1.5 text-slate-400">
                    {index + 1}
                  </td>

                  <td className="
                    px-3
                    py-1.5
                    font-medium
                    text-slate-700
                  ">
                    {contact.name}
                  </td>

                  <td className="
                    px-3
                    py-1.5
                    text-slate-600
                  ">
                    {contact.phone}
                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>


        {contacts.length > 20 && (
          <p className="
            text-[9px]
            text-slate-400
            text-center
            mt-1
          ">
            Showing 20 of {contacts.length} contacts
          </p>
        )}

      </div>

    </div>
  );
}