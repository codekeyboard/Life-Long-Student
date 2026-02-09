const express = require("express");
const cors = require("cors");
const { v4: uuidv4 } = require("uuid");
const { createPool, migrate, waitForDb } = require("./db");

const PORT = Number(process.env.PORT ?? 8080);

async function main() {
  const pool = createPool();
  await waitForDb(pool);
  await migrate(pool);

  const app = express();
  app.use(cors());
  app.use(express.json());

  app.get("/health", async (_req, res) => {
    try {
      await pool.query("SELECT 1");
      res.json({ ok: true });
    } catch (error) {
      res.status(500).json({ ok: false, error: String(error?.message ?? error) });
    }
  });

  app.get("/api/todos", async (_req, res) => {
    const [rows] = await pool.execute(
      "SELECT id, title, completed, created_at FROM todos ORDER BY created_at DESC"
    );
    res.json(rows);
  });

  app.post("/api/todos", async (req, res) => {
    const title = String(req.body?.title ?? "").trim();
    if (!title) return res.status(400).json({ error: "title is required" });

    const id = uuidv4();
    await pool.execute("INSERT INTO todos (id, title, completed) VALUES (?, ?, 0)", [id, title]);

    const [[todo]] = await pool.execute(
      "SELECT id, title, completed, created_at FROM todos WHERE id = ?",
      [id]
    );
    res.status(201).json(todo);
  });

  app.patch("/api/todos/:id", async (req, res) => {
    const id = String(req.params.id ?? "").trim();
    const titleRaw = req.body?.title;
    const completedRaw = req.body?.completed;

    const updates = [];
    const values = [];

    if (typeof titleRaw !== "undefined") {
      const title = String(titleRaw).trim();
      if (!title) return res.status(400).json({ error: "title cannot be empty" });
      updates.push("title = ?");
      values.push(title);
    }

    if (typeof completedRaw !== "undefined") {
      const completed = completedRaw === true || completedRaw === 1 || completedRaw === "1";
      updates.push("completed = ?");
      values.push(completed ? 1 : 0);
    }

    if (updates.length === 0) return res.status(400).json({ error: "no fields to update" });

    values.push(id);
    const [result] = await pool.execute(`UPDATE todos SET ${updates.join(", ")} WHERE id = ?`, values);
    if (result.affectedRows === 0) return res.status(404).json({ error: "not found" });

    const [[todo]] = await pool.execute(
      "SELECT id, title, completed, created_at FROM todos WHERE id = ?",
      [id]
    );
    res.json(todo);
  });

  app.delete("/api/todos/:id", async (req, res) => {
    const id = String(req.params.id ?? "").trim();
    const [result] = await pool.execute("DELETE FROM todos WHERE id = ?", [id]);
    if (result.affectedRows === 0) return res.status(404).json({ error: "not found" });
    res.json({ deleted: true });
  });

  const server = app.listen(PORT, () => {
    console.log(`Backend listening on port ${PORT}`);
  });

  const shutdown = async () => {
    server.close(() => undefined);
    try {
      await pool.end();
    } finally {
      process.exit(0);
    }
  };

  process.on("SIGINT", shutdown);
  process.on("SIGTERM", shutdown);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
