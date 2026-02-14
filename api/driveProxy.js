// server/driveProxy.js

import path from "path";
import { google } from "googleapis";
import { fileURLToPath } from "url";


function makeDriveClient() {
  // Either via inline JSON in env…
 
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const auth = new google.auth.GoogleAuth({
  keyFile: path.join(__dirname, "service-account.json"),
  scopes: ["https://www.googleapis.com/auth/drive.readonly"],
});

return google.drive({ version: "v3", auth })


  // …or use keyFile if you prefer
  // const auth = new google.auth.GoogleAuth({
  //   keyFile: path.join(__dirname, "service-account.json"),
  //   scopes: ["https://www.googleapis.com/auth/drive.readonly"],
  // });
  // return google.drive({ version: "v3", auth });

  // throw new Error("Service account credentials not provided.");
}

const drive = makeDriveClient();

/**
 * Streams image bytes for a Drive fileId
 * Query: ?id=<fileId>
 */
export async function proxyDriveImage(req, res) {
  try {
    const fileId = req.query.id;
    if (!fileId) return res.status(400).send("Missing file id");

    const response = await drive.files.get(
      { fileId, alt: "media" },
      { responseType: "stream" }
    );

    // -------------------------
    // 🔥 ADD THESE HEADERS HERE
    // -------------------------
    res.setHeader(
      "Content-Type",
      response.headers["content-type"] || "image/jpeg"
    );

    // CORS — allow your frontend origin or * for dev
    res.setHeader("Access-Control-Allow-Origin", "*");

    // Good practice for caching/proxies
    res.setHeader("Vary", "Origin");

    // Prevent browser treating response as credentials flow
    res.removeHeader("Set-Cookie");

    // --------------------------
    // Now pipe the raw image bytes
    // --------------------------
    response.data.on("error", (err) => {
      console.error("Drive stream error:", err);
      res.destroy(err);
    });

    response.data.pipe(res);

  } catch (err) {
    console.error("Service account proxy error:", err?.message || err);
    res.status(500).send("Drive proxy error");
  }
}

/**
 * (Optional) Light metadata probe to debug permissions quickly.
 * Query: ?id=<fileId>
 */
export async function probeFile(req, res) {
  try {
    const fileId = req.query.id;
    if (!fileId) return res.status(400).json({ ok: false, error: "Missing file id" });

    const meta = await drive.files.get({
      fileId,
      fields: "id, name, mimeType, permissions, owners, driveId",
      supportsAllDrives: true,
    });

    res.json({ ok: true, meta: meta.data });
  } catch (err) {
    res.status(err?.response?.status || 500).json({
      ok: false,
      error: err?.response?.data || err?.message || "Probe failed",
    });
  }
}

