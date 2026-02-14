// server/server.js
import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import cors from "cors";
import { proxyDriveImage } from "./driveProxy.js";
import { driveListHandler } from "./driveList.js";

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 1) CORS FIRST
const allowedOrigins = [
  "http://127.0.0.1:5500",
  "http://localhost:5500",
  "http://localhost:3000",
];
app.use(
  cors({
    origin(origin, cb) {
      if (!origin || allowedOrigins.includes(origin)) return cb(null, true);
      return cb(new Error("Not allowed by CORS"));
    },
    methods: ["GET", "HEAD", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    maxAge: 86400,
  })
);

// 2) Static files (optional)
app.use(express.static(path.join(__dirname, "../public")));

// 3) API routes
app.get("/api/drive-image", proxyDriveImage);
app.get("/api/drive-list", driveListHandler);
app.get("/health", (_req, res) => res.json({ ok: true }));



// 4) Start server LAST
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`Server running → http://localhost:${PORT}`));// inside 