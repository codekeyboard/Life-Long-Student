# Compose Node Todo App (Frontend + Backend + MariaDB)

This project is a Docker Compose practice app with 3 containers:
- `frontend`: Vite dev server (UI) on `http://localhost:3000`
- `backend`: Node/Express API on `http://localhost:8080`
- `db`: MariaDB database (not exposed to the host)

## Where each part comes from (project files)

- `docker-compose.yml`: wires everything together (services, ports, networks, volumes, secrets)

- `backend/`:
  - `backend/Dockerfile`: backend image build
  - `backend/package.json`: `npm run dev` script used by Compose
  - `backend/src/index.js`: Express API (`/api/todos`, `/health`)
  - `backend/src/db.js`: reads DB env + secret file (`DB_PASSWORD_FILE`)

- `frontend/`:
  - `frontend/Dockerfile`: frontend image build (Node + Vite)
  - `frontend/package.json`: `npm run dev` (Vite server on port `5173`)
  - `frontend/vite.config.js`: proxies `/api` → `http://backend:8080`
  - `frontend/src/*`: UI files you edit during dev

- `db/`:
  - `db/init.sql`: initial schema/seed (runs only when DB volume is empty)

- `secrets/`:
  - `secrets/db-password.txt`: DB user password (mounted as a Compose secret)
  - `.gitignore`: ignores `secrets/*.txt` so passwords aren’t committed

## Run

From `Feb-26/practice/compose-node-app`:

```bash
docker compose up --build
```

Open:
- Frontend: `http://localhost:3000`
- Backend health: `http://localhost:8080/health`

Reset DB data (this deletes the DB volume, so `db/init.sql` runs again):

```bash
docker compose down -v
docker compose up --build
```

## docker-compose.yml explained (why every key exists)

Compose doesn’t need a `version:` field with modern Docker Compose v2; it infers the format.

### Top-level keys

- `services`: the containers to run
- `volumes`: named Docker volumes (persistent storage)
- `secrets`: local secret files mounted into containers at `/run/secrets/...`
- `networks`: isolated networks that control which containers can talk

### `services.backend` (API server)

- `build.context: ./backend`
  - Builds an image using `backend/Dockerfile`.
- `restart: unless-stopped`
  - Restarts if it crashes, until you explicitly stop it.
- `command: sh -c "npm install && npm run dev"`
  - Dev startup:
    - `npm install` installs dependencies into `/app/node_modules`.
    - `npm run dev` runs the `dev` script from `backend/package.json` (which uses Node’s watch mode).
- `environment:`
  - `NODE_ENV: development`
    - Conventional flag for dev mode (some libraries change behavior).
  - `PORT: 8080`
    - Used by `backend/src/index.js` to pick the listening port.
  - `DB_HOST/DB_PORT/DB_USER/DB_NAME`
    - Used by `backend/src/db.js` to connect to MariaDB.
  - `DB_PASSWORD_FILE: /run/secrets/db-password`
    - Used by `backend/src/db.js` to read the password from a mounted secret file.
- `secrets: [db-password]`
  - Makes `/run/secrets/db-password` available inside the backend container.
- `depends_on: db: { condition: service_healthy }`
  - Waits for the DB healthcheck to pass before starting the backend container.
  - This avoids the common “backend starts too early → DB connection refused” problem.
  - The backend also retries connecting in `backend/src/db.js` (`waitForDb()`) as a second layer of safety.
- `networks: [public, private]`
  - `public`: so `frontend` can reach `backend` (`http://backend:8080`) inside Docker.
  - `private`: so `backend` can reach `db` while keeping DB isolated from `frontend`.
- `ports: ["8080:8080"]`
  - Publishes backend to your host so you can curl it at `http://localhost:8080`.
  - (Inside Docker, frontend calls `http://backend:8080` using the service name, not `localhost`.)
- `volumes:`
  - `./backend:/app`
    - Bind-mounts your backend folder into the container (live editing).
  - `backend_node_modules:/app/node_modules`
    - Stores `node_modules` in a Docker volume (keeps deps out of your repo and avoids OS/arch mismatch issues).

### `services.db` (MariaDB)

- `image: mariadb:11`
  - Uses the official MariaDB image (version 11).
- `restart: always`
  - Restarts automatically (good default for database containers).
- `environment:`
  - `MARIADB_ROOT_PASSWORD`
    - Sets the root password (also used by the healthcheck command).
  - `MARIADB_DATABASE`
    - Creates the initial DB (`todo_db`) on first start.
  - `MARIADB_USER`
    - Creates an app user (`todo_user`) on first start.
  - `MARIADB_PASSWORD_FILE`
    - Reads the app user password from `/run/secrets/db-password`.
  - These env vars are read by the MariaDB Docker image entrypoint scripts (not by your Node code).
- `secrets: [db-password]`
  - Provides `/run/secrets/db-password` so `MARIADB_PASSWORD_FILE` works.
- `volumes:`
  - `db_data:/var/lib/mysql`
    - Persists DB files (todos survive container restarts).
  - `./db/init.sql:/docker-entrypoint-initdb.d/init.sql:ro`
    - Runs `db/init.sql` on the *first* initialization only (when `db_data` is empty).
    - `:ro` makes it read-only inside the container.
  - Note: the backend also runs a small “migration” (`CREATE TABLE IF NOT EXISTS`) in `backend/src/db.js` for safety.
- `networks: [private]`
  - DB is only reachable from containers on the `private` network (backend).
- `healthcheck:`
  - Helps Docker report DB readiness.
  - `test`: runs `mariadb-admin ping` (or `mysqladmin ping`) using the root password.
  - `interval/timeout/retries`: how often and how long Docker will keep checking.

### `services.frontend` (UI dev server)

- `build.context: ./frontend`
  - Builds an image using `frontend/Dockerfile`.
- `restart: unless-stopped`
  - Restarts if it crashes.
- `command: sh -c "npm install && npm run dev"`
  - Installs dependencies into `/code/node_modules` then starts Vite using `frontend/package.json`.
- `depends_on: [backend]`
  - Starts backend before frontend.
- `networks: [public]`
  - Frontend can reach backend, but cannot reach DB (frontend is not attached to `private`).
- `ports: ["3000:5173"]`
  - Publishes the Vite dev server to your host on port `3000`.
  - Vite runs *inside the container* on port `5173`.
- `volumes:`
  - `./frontend/src:/code/src`
    - Live-edit only the frontend source directory (`frontend/src/*`).
    - Tip: if you want live edits for `frontend/vite.config.js` too, mount `./frontend:/code` instead.
  - `frontend_node_modules:/code/node_modules`
    - Stores `node_modules` in a Docker volume.

### `volumes` (named persistent storage)

- `db_data`: MariaDB data directory
- `backend_node_modules`: backend dependencies
- `frontend_node_modules`: frontend dependencies

### `secrets`

`secrets.db-password.file: ./secrets/db-password.txt`

- Used by:
  - `services.backend.environment.DB_PASSWORD_FILE`
  - `services.db.environment.MARIADB_PASSWORD_FILE`
- The actual file is in `secrets/db-password.txt` and is ignored by `Feb-26/practice/compose-node-app/.gitignore`.

### `networks` (public vs private)

- `public`: normal app traffic (`frontend` ↔ `backend`)
- `private` with `internal: true`: isolated network (`backend` ↔ `db`)

Connectivity summary:
- Frontend → Backend: allowed (both on `public`)
- Frontend → DB: blocked (frontend not on `private`)
- Backend → DB: allowed (both on `private`)
