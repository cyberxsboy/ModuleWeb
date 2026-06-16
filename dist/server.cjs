var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));

// server.ts
var import_express = __toESM(require("express"), 1);
var import_path = __toESM(require("path"), 1);
var import_fs = __toESM(require("fs"), 1);
var import_vite = require("vite");
var app = (0, import_express.default)();
var PORT = 3e3;
var DATA_DIR = import_path.default.join(process.cwd(), "data");
var DATA_FILE = import_path.default.join(DATA_DIR, "shares.json");
var sharesCache = {};
try {
  if (!import_fs.default.existsSync(DATA_DIR)) {
    import_fs.default.mkdirSync(DATA_DIR, { recursive: true });
  }
  if (import_fs.default.existsSync(DATA_FILE)) {
    const raw = import_fs.default.readFileSync(DATA_FILE, "utf-8");
    sharesCache = JSON.parse(raw);
  } else {
    import_fs.default.writeFileSync(DATA_FILE, JSON.stringify({}, null, 2), "utf-8");
  }
} catch (error) {
  console.warn("Failed to initialize file-based persistence, using memory-only database.");
}
app.use(import_express.default.json({ limit: "60mb" }));
app.use(import_express.default.urlencoded({ limit: "60mb", extended: true }));
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", time: (/* @__PURE__ */ new Date()).toISOString() });
});
app.post("/api/share", async (req, res) => {
  try {
    const { type, siteData, cardData } = req.body;
    if (!type || type !== "site" && type !== "card") {
      return res.status(400).json({ error: 'Invalid share type. Must be "site" or "card".' });
    }
    if (type === "site" && !siteData) {
      return res.status(400).json({ error: "Missing siteData content for site share." });
    }
    if (type === "card" && !cardData) {
      return res.status(400).json({ error: "Missing cardData content for card share." });
    }
    const id = Math.random().toString(36).substring(2, 10).toUpperCase();
    const newRecord = {
      id,
      type,
      siteData,
      cardData,
      createdAt: Date.now()
    };
    sharesCache[id] = newRecord;
    try {
      await import_fs.default.promises.writeFile(DATA_FILE, JSON.stringify(sharesCache, null, 2), "utf-8");
    } catch (writeErr) {
      console.error("Failed to persist share database to disks:", writeErr);
    }
    res.json({ success: true, id, shareUrl: `/share/${id}` });
  } catch (error) {
    console.error("Error sharing content:", error);
    res.status(500).json({ error: error.message || "Server error occurred during share generation." });
  }
});
app.get("/api/share/:id", (req, res) => {
  const { id } = req.params;
  const uppercaseId = id.toUpperCase();
  const record = sharesCache[uppercaseId];
  if (!record) {
    return res.status(404).json({ error: "\u627E\u4E0D\u5230\u8BE5\u9875\u9762\u6216\u8D3A\u5361\uFF0C\u94FE\u63A5\u53EF\u80FD\u5DF2\u8FC7\u671F\u3002" });
  }
  res.json({ success: true, ...record });
});
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    console.log("Running Express server in DEVELOPMENT mode...");
    const vite = await (0, import_vite.createServer)({
      server: { middlewareMode: true },
      appType: "spa"
    });
    app.use(vite.middlewares);
  } else {
    console.log("Running Express server in PRODUCTION mode...");
    const distPath = import_path.default.join(process.cwd(), "dist");
    app.use(import_express.default.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(import_path.default.join(distPath, "index.html"));
    });
  }
  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server started successfully. Binding to port ${PORT}`);
  });
}
startServer();
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */
//# sourceMappingURL=server.cjs.map
