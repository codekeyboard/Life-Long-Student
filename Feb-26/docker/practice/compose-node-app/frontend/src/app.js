const form = document.getElementById("todo-form");
const titleInput = document.getElementById("todo-title");
const list = document.getElementById("todo-list");
const statusEl = document.getElementById("status");
const refreshBtn = document.getElementById("refresh");

function setStatus(message) {
  statusEl.textContent = message ?? "";
}

async function api(path, options) {
  const res = await fetch(path, {
    headers: { "Content-Type": "application/json" },
    ...options,
  });

  if (!res.ok) {
    let body = "";
    try {
      body = await res.text();
    } catch {
      body = "";
    }
    throw new Error(`${res.status} ${res.statusText}${body ? ` - ${body}` : ""}`);
  }

  const contentType = res.headers.get("content-type") ?? "";
  if (contentType.includes("application/json")) return res.json();
  return res.text();
}

function renderTodos(todos) {
  list.innerHTML = "";
  for (const todo of todos) {
    const li = document.createElement("li");
    li.className = "item";

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = Boolean(todo.completed);
    checkbox.addEventListener("change", async () => {
      try {
        setStatus("Updating...");
        await api(`/api/todos/${todo.id}`, {
          method: "PATCH",
          body: JSON.stringify({ completed: checkbox.checked }),
        });
        await loadTodos();
        setStatus("");
      } catch (e) {
        setStatus(String(e.message ?? e));
        checkbox.checked = !checkbox.checked;
      }
    });

    const title = document.createElement("div");
    title.className = `title${todo.completed ? " completed" : ""}`;
    title.textContent = todo.title;

    const del = document.createElement("button");
    del.className = "danger";
    del.type = "button";
    del.textContent = "Delete";
    del.addEventListener("click", async () => {
      try {
        setStatus("Deleting...");
        await api(`/api/todos/${todo.id}`, { method: "DELETE" });
        await loadTodos();
        setStatus("");
      } catch (e) {
        setStatus(String(e.message ?? e));
      }
    });

    li.appendChild(checkbox);
    li.appendChild(title);
    li.appendChild(del);
    list.appendChild(li);
  }
}

async function loadTodos() {
  refreshBtn.disabled = true;
  try {
    const todos = await api("/api/todos");
    renderTodos(todos);
  } finally {
    refreshBtn.disabled = false;
  }
}

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const title = titleInput.value.trim();
  if (!title) return;

  try {
    setStatus("Adding...");
    await api("/api/todos", { method: "POST", body: JSON.stringify({ title }) });
    titleInput.value = "";
    await loadTodos();
    setStatus("");
  } catch (e2) {
    setStatus(String(e2.message ?? e2));
  }
});

refreshBtn.addEventListener("click", async () => {
  try {
    setStatus("Refreshing...");
    await loadTodos();
    setStatus("");
  } catch (e) {
    setStatus(String(e.message ?? e));
  }
});

loadTodos().catch((e) => setStatus(String(e.message ?? e)));

