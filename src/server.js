require("dotenv").config();
const app = require("./app");
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Servidor de tareas ejecutándose en el puerto ${PORT}`);
});
