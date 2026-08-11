/**
 * Extract Google Spreadsheet ID from a normal Google Sheet URL.
 *
 * Example:
 * https://docs.google.com/spreadsheets/d/1AbCdEfGhIjKlMnOpQrStUvWxYz/edit?gid=0
 *
 * Returns:
 * 1AbCdEfGhIjKlMnOpQrStUvWxYz
 */

export function extractSheetId(url) {
  if (!url || typeof url !== "string") {
    return null;
  }

  const match = url.match(/\/spreadsheets\/d\/([a-zA-Z0-9-_]+)/);

  return match ? match[1] : null;
}