import express from "express"
import mysql from "mysql2/promise"

const app = express()
const port = 3000

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

    app.get('/', (req, res) => {
        send()
    })


    app.listen(port, () => {
        console.log(`Servidor escuchando en http://localhost:${port}`)
    });
}

main().catch(err => {
    console.log(`Error al inicar el servidor: ${err}`)
})