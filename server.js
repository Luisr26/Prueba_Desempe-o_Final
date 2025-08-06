import express from "express"
import mysql from "mysql2/promise"
import path from "path";
import { fileURLToPath } from "url";

const app = express()
const port = 3000

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.static(path.join(__dirname, "public")));

app.use("/fontawesome", express.static(path.join(__dirname, "node_modules", "@fortawesome", "fontawesome-free")));


async function main() {
    const connection = await mysql.createConnection({
        host: "bqcohlyjnacmrkr9muad-mysql.services.clever-cloud.com",
        user: "us1xtbb2ztwynjib",
        password: "Wf7lHlB4IuluGSOXagQG",
        database: "bqcohlyjnacmrkr9muad"
    });

    console.log("Conectando a la base de datos.........")


    app.get("/users", async (req, res) => {
        try{
            const [rows] = await connection.execute("SELECT * FROM estudiantes");
            res.json(rows)
        }catch(error){
            res.status(500).send("Error en la consulta");
        }
    });

    app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "index.html"));
  });


    app.listen(port, () => {
        console.log(`Servidor escuchando en http://localhost:${port}`)
    });
}

main().catch(err => {
    console.log(`Error al inicar el servidor: ${err}`)
})