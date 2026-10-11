import express from "express";
import path from "node:path";
import { fileURLToPath } from "node:url";
const root = path.dirname(fileURLToPath(import.meta.url));
const app = express();
app.use(express.json());
app.use(express.static(path.join(root, "public")));
app.post("/api", (req, res) => {
  const raw = String(req.body.text || "").trim();
  const n = Number(raw);
  if (Number.isFinite(n) && raw !== "") {
    const ms = n < 1e12 ? n * 1000 : n;
    return res.json({ iso: new Date(ms).toISOString(), unix: Math.floor(ms / 1000) });
  }
  const d = new Date(raw);
  if (Number.isNaN(d.getTime())) return res.status(400).json({ error: "not a date" });
  res.json({ iso: d.toISOString(), unix: Math.floor(d.getTime() / 1000) });
});
app.listen(process.env.PORT || 8122);
