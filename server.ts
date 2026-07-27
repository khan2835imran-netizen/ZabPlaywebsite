import express from "express";
import path from "path";
import fs from "fs";
import { createServer as createViteServer } from "vite";

const app = express();
const PORT = 3000;

// High body limit to support uploading APK files and images via Base64/DataURL
app.use(express.json({ limit: "100mb" }));
app.use(express.urlencoded({ limit: "100mb", extended: true }));

// Ensure uploads directory exists
const uploadsDir = path.join(process.cwd(), "uploads");
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

// Serve uploaded files statically at /uploads/
app.use("/uploads", express.static(uploadsDir));

const dataFilePath = path.join(uploadsDir, "app-data.json");

// Helper to load persistent app data
function getStoredAppData() {
  if (fs.existsSync(dataFilePath)) {
    try {
      const fileData = fs.readFileSync(dataFilePath, "utf-8");
      return JSON.parse(fileData);
    } catch (err) {
      console.error("Error reading app-data.json:", err);
    }
  }
  return null;
}

// Helper to save persistent app data
function saveStoredAppData(data: any) {
  try {
    fs.writeFileSync(dataFilePath, JSON.stringify(data, null, 2), "utf-8");
    return true;
  } catch (err) {
    console.error("Error writing app-data.json:", err);
    return false;
  }
}

// API Routes
app.get("/api/app-data", (req, res) => {
  const data = getStoredAppData();
  res.json({ success: true, data });
});

app.post("/api/app-data", (req, res) => {
  const newData = req.body;
  if (!newData) {
    return res.status(400).json({ success: false, error: "No data provided" });
  }
  const saved = saveStoredAppData(newData);
  res.json({ success: saved });
});

// API endpoint for uploading files (APK, Images, Logos) via Data URL or raw base64
app.post("/api/upload", (req, res) => {
  try {
    const { fileName, fileData, mimeType } = req.body;
    if (!fileName || !fileData) {
      return res.status(400).json({ success: false, error: "Missing fileName or fileData" });
    }

    // Sanitize filename
    const safeName = fileName.replace(/[^a-zA-Z0-9_.-]/g, "_");
    const uniqueFileName = `${Date.now()}_${safeName}`;
    const targetPath = path.join(uploadsDir, uniqueFileName);

    // Extract base64 buffer from data URL
    let base64String = fileData;
    if (fileData.includes(";base64,")) {
      base64String = fileData.split(";base64,")[1];
    }

    const buffer = Buffer.from(base64String, "base64");
    fs.writeFileSync(targetPath, buffer);

    const publicUrl = `/uploads/${uniqueFileName}`;
    const fileSizeMb = (buffer.length / (1024 * 1024)).toFixed(1) + " MB";

    console.log(`[File Uploaded] ${uniqueFileName} (${fileSizeMb}) saved to ${targetPath}`);

    return res.json({
      success: true,
      url: publicUrl,
      fileName: uniqueFileName,
      originalName: fileName,
      size: fileSizeMb,
      bytes: buffer.length,
    });
  } catch (err: any) {
    console.error("File upload error:", err);
    return res.status(500).json({ success: false, error: err.message || "Upload failed" });
  }
});

async function startServer() {
  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
