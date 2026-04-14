import express from "express"
import { connect } from "./db/conn.js"
import User from "./models/User.js"
import bcrypt from "bcrypt"

const app = express()

app.use(express.json())

// 🔌 conectar ao banco
connect()

//  rota raiz
app.get("/", (req, res) => {
    res.send("API rodando 🚀")
})

//  GET → listar usuários (SEM senha)
app.get("/users", async (req, res) => {
    try {
        const users = await User.find().select("-password")
        res.status(200).json(users)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
})

// ➕ POST → criar usuário (COM senha criptografada)
app.post("/users", async (req, res) => {
    try {
        const { name, email, password, image, phone } = req.body

        //  gerar salt
        const salt = await bcrypt.genSalt(10)

        //  criptografar senha
        const passwordHash = await bcrypt.hash(password, salt)

        //  criar usuário
        const user = new User({
            name,
            email,
            password: passwordHash,
            image,
            phone
        })

        await user.save()

        res.status(201).json(user)

    } catch (error) {
        res.status(500).json({ error: error.message })
    }
})


app.listen(3000, () => {
    console.log("Servidor rodando na porta 3000")
})