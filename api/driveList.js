// server/driveList.js
import { google } from "googleapis";
import path from "path";
import { fileURLToPath } from "url";

/**
 * Drive client factory.
 * Reuse the same approach you used in driveProxy.js (env JSON or keyFile).
 */
function makeDriveClient() {
//   if (process.env.GOOGLE_SERVICE_ACCOUNT_JSON) {
    // const credentials = JSON.parse(process.env.GOOGLE_SERVICE_ACCOUNT_JSON);
    // const auth = new google.auth.GoogleAuth({
    //   credentials,
    //   scopes: ["https://www.googleapis.com/auth/drive.readonly"],
    // });
    // return google.drive({ version: "v3", auth });
    
//   }
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

  // If you prefer using keyFile on disk, uncomment & adjust:
  const auth = new google.auth.GoogleAuth({
    keyFile: path.join(__dirname, "service-account.json"),
    scopes: ["https://www.googleapis.com/auth/drive.readonly"],
  });
  return google.drive({ version: "v3", auth });

  throw new Error("Service account credentials not provided.");
}

const drive = makeDriveClient();

/**
 * Extract a folderId from various Google Drive folder link shapes.
 * - https://drive.google.com/drive/folders/<ID>?...
 * - https://drive.google.com/drive/u/0/folders/<ID>
 * - https://drive.google.com/open?id=<ID>
 */
function extractFolderId(input) {
  if (!input) return "";
  const patterns = [/folders\/([a-zA-Z0-9_-]+)/, /id=([a-zA-Z0-9_-]+)/];
  for (const p of patterns) {
    const m = input.match(p);
    if (m?.[1]) return m[1];
  }
  // If caller passed an ID directly, accept it
  if (/^[a-zA-Z0-9_-]{20,}$/.test(input)) return input;
  return "";
}

/**
 * GET /api/drive-list?folder=<folderLinkOrId>
 * Returns: { ok: true, files: [ { id, name, mimeType } ] }
 */
export async function driveListHandler(req, res) {
  try {
    const folder = req.query.folder;
    const folderId = extractFolderId(folder);
    if (!folderId) {
      return res.status(400).json({ ok: false, error: "Invalid folder link or id" });
    }

    const pageSize = 100;
    let pageToken = undefined;
    const files = [];

    do {
      const { data } = await drive.files.list({
        q: `'${folderId}' in parents and mimeType contains 'image/' and trashed=false`,
        fields: "nextPageToken, files(id, name, mimeType)",
        pageSize,
        pageToken,
        supportsAllDrives: true,
        includeItemsFromAllDrives: true,
      });
      files.push(...(data.files || []));
      pageToken = data.nextPageToken || undefined;
    } while (pageToken);

    res.json({ ok: true, files });
  } catch (err) {
    const status = err?.response?.status || 500;
    console.error("drive-list error:", err?.response?.data || err?.message || err);
    res.status(status).json({ ok: false, error: "drive-list failed" });
  }
}