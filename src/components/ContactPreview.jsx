export default function ContactPreview({ contacts = [] }) {
  if (contacts.length === 0) return null;

  return (
    <div className="bg-white rounded-3xl shadow-sm border border-slate-200 p-8 mt-8">

      <div className="flex items-center justify-between mb-6">

        <div>
          <h2 className="text-2xl font-bold">
            Contact Preview
          </h2>

          <p className="text-slate-500 mt-1">
            Showing first 20 contacts
          </p>
        </div>

        <div className="text-right">

          <h2 className="text-3xl font-bold text-blue-600">
            {contacts.length}
          </h2>

          <p className="text-slate-500">
            Valid Contacts
          </p>

        </div>

      </div>

      <div className="overflow-auto max-h-[500px] rounded-2xl border">

        <table className="w-full">

          <thead className="bg-slate-100 sticky top-0">

            <tr>

              <th className="text-left p-4">
                #
              </th>

              <th className="text-left p-4">
                Name
              </th>

              <th className="text-left p-4">
                Phone
              </th>

            </tr>

          </thead>

          <tbody>

            {contacts.slice(0,20).map((contact,index)=>(
              <tr
                key={index}
                className="border-t hover:bg-slate-50"
              >

                <td className="p-4">
                  {index+1}
                </td>

                <td className="p-4 font-medium">
                  {contact.name}
                </td>

                <td className="p-4">
                  {contact.phone}
                </td>

              </tr>
            ))}

          </tbody>

        </table>

      </div>

    </div>
  );
}