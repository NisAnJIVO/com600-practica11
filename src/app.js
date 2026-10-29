const express = require("express");
const { estadoDeTarea } = require("./tarea");
const { autenticar, exigirRol } = require("./auth");
const app = express();
app.use(express.json());
const tareas = [{ id: 1, titulo: "Preparar el laboratorio", completada: false }];

app.use("/tareas", autenticar);

app.post("/tareas", (req, res) => {
  if (!req.body.titulo) return res.status(400).json({ error: "titulo es obligatorio" });
  const tarea = { id: tareas.length + 1, ...req.body, completada: false };
  tareas.push(tarea);
  return res.status(201).json(tarea);
});

app.get("/tareas", (_req, res) => res.json(
  tareas.map(t => ({ ...t, estado: estadoDeTarea(t) }))
));

app.get("/health", (_req, res) => res.json({ status: "ok" }));

app.delete("/tareas/:id", exigirRol("admin"), (req, res) => {
  const i = tareas.findIndex((t) => t.id === Number(req.params.id));
  if (i < 0) return res.status(404).json({ error: "no existe" });
  tareas.splice(i, 1);
  res.status(204).end();
});

module.exports = app;