const request = require("supertest");
const app = require("../src/app");

describe("API de tareas", () => {
  test("POST /tareas crea la tarea y responde 201", async () => {
    const res = await request(app).post("/tareas").send({ titulo: "Estudiar" });
    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty("id");
  });

  test("POST /tareas sin título responde 400 y no crea nada", async () => {
    const res = await request(app).post("/tareas").send({});
    expect(res.status).toBe(400);
    expect(res.body.error).toMatch(/titulo/);
  });

  test("GET /tareas devuelve la lista de tareas con su estado", async () => {
    const res = await request(app).get("/tareas");
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  test("GET /health responde status ok", async () => {
    const res = await request(app).get("/health");
    expect(res.status).toBe(200);
    expect(res.body).toEqual({ status: "ok" });
  });
});
