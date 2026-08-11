export function buildContacts(rows, mapping, contactTitle = "") {
  const contacts = [];
  const seen = new Set();

  for (const row of rows) {
    const rawSl = row[mapping.sl];
    const rawName = row[mapping.name];
    const rawPhone = row[mapping.phone];

    const slNo = rawSl ? String(rawSl).trim() : "";
    const name = rawName ? String(rawName).trim() : "";
    let phone = rawPhone ? String(rawPhone).trim() : "";

    // Remove spaces, hyphens, brackets
    phone = phone.replace(/[\s()-]/g, "");

    // Remove +91 if present
    if (phone.startsWith("+91")) {
      phone = phone.substring(3);
    }

    // Remove leading 91 if present
    if (phone.startsWith("91") && phone.length === 12) {
      phone = phone.substring(2);
    }

    // Skip invalid rows
    if (!name || !phone) continue;

    // Must be exactly 10 digits
    if (!/^\d{10}$/.test(phone)) continue;

    // Skip duplicate phone numbers
    if (seen.has(phone)) continue;

    seen.add(phone);

    // Build contact name
    const fullName = contactTitle.trim()
      ? `${slNo} ${name} (${contactTitle})`
      : `${slNo} ${name}`;

    contacts.push({
      name: fullName,
      phone,
    });
  }

  return contacts;
}