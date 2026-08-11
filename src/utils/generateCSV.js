export function generateGoogleContactsCSV(contacts) {
  if (!contacts.length) {
    alert("No contacts available.");
    return;
  }

  const headers = [
    "Name",
    "Phone Number",
  ];

  const rows = contacts.map((contact) => [
    contact.name,
    contact.phone,
  ]);

  const csv = [headers, ...rows]
    .map((row) =>
      row
        .map((value) => `"${value}"`)
        .join(",")
    )
    .join("\n");

  const blob = new Blob([csv], {
    type: "text/csv;charset=utf-8;",
  });

  const url = URL.createObjectURL(blob);

  const link = document.createElement("a");

  link.href = url;
  link.download = "Contacts.csv";

  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);

  URL.revokeObjectURL(url);
}