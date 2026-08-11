import axios from "axios";

export async function readGoogleSheet(sheetId, accessToken) {
  // Get spreadsheet metadata
  const meta = await axios.get(
    `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );

  // Take the first sheet
  const firstSheet = meta.data.sheets[0].properties.title;

  // Read all values
  const response = await axios.get(
    `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/${encodeURIComponent(firstSheet)}`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );

  const values = response.data.values || [];

  if (values.length === 0) {
    return {
      headers: [],
      rows: [],
    };
  }

  const headers = values[0];

  const rows = values.slice(1).map((row) => {
    const obj = {};

    headers.forEach((header, index) => {
      obj[header] = row[index] || "";
    });

    return obj;
  });

  return {
    headers,
    rows,
  };
}