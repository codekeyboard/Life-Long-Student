const mysql = require("mysql2/promise");
const fs = require("node:fs");

function readSecretFile(secretPath) {
  const value = fs.readFileSync(secretPath, "utf8").trim();
  if (!value) throw new Error(`Secret file is empty: ${secretPath}`);
  return value;
}

function getDbPassword() {
  if (process.env.DB_PASSWORD_FILE) return readSecretFile(process.env.DB_PASSWORD_FILE);
  return process.env.DB_PASSWORD ?? "todo_pass";
}

function getDbConfig() {
  return {
    host: process.env.DB_HOST ?? "127.0.0.1",
    port: Number(process.env.DB_PORT ?? 3306),
    user: process.env.DB_USER ?? "todo_user",
    password: getDbPassword(),
    database: process.env.DB_NAME ?? "todo_db",
  };
}

function createPool() {
  const config = getDbConfig();

  return mysql.createPool({
    ...config,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
  });
}

async function waitForDb(pool, { retries = 25, delayMs = 1000 } = {}) {
  let lastError;
  for (let attempt = 1; attempt <= retries; attempt += 1) {
    try {
      await pool.query("SELECT 1");
      return;
    } catch (error) {
      lastError = error;
      await new Promise((r) => setTimeout(r, delayMs));
    }
  }

  throw lastError;
}

async function migrate(pool) {
  await pool.execute(`
    CREATE TABLE IF NOT EXISTS todos (
      id CHAR(36) NOT NULL PRIMARY KEY,
      title VARCHAR(255) NOT NULL,
      completed TINYINT(1) NOT NULL DEFAULT 0,
      created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
    )
  `);
}

module.exports = { createPool, migrate, waitForDb };
