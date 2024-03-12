import express from "express";
import { model, connect } from "mongoose";
import userSchema from "./Schemas/user.js";
import UserWallet from "./Schemas/userWalletSchema.js";
import UserAccount from "./Schemas/userAccountSchema.js";
import bcrypt from "bcrypt";

const User = model("User", userSchema);
const UserWallet = model('UserWallet', userWalletSchema);
const UserAccount = model('UserAccount', userAccountSchema);
const app = express();
const salt = bcrypt.genSaltSync(10);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

//fiz uma alteraçao para um banco de dados via netword "hospedado"
connect(
    "mongodb+srv://Socrates:Namikaze123@cluster0.hh2hejz.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
)
    .then(() => console.log("Conexão bem sucedida ao MongoDB Atlas"))
    .catch((err) => console.error("Erro ao conectar ao MongoDB Atlas:", err));

app.get("/", (req, res) => {
    res.render("home.ejs");
});

app.get("/login", (req, res) => {
    res.render("login.ejs");
});

app.post("/signin", async (req, res) => {
    const email = req.body.email;
    const pass = req.body.pass;
    console.log(email);
    let user = await User.findOne({ email: email }).select("+password");
    console.log(user);
    console.log(user.password);
    console.log(pass);

    if (!user) {
        res.status(400).render("Usuário não encontrado");
    }

    try {
        const passCorrect = bcrypt.compareSync(pass, user.password);
        if (passCorrect) {
            res.render("dashboard.ejs");
        } else {
            res.send("Senha incorreta, volte e tente novamente");
        }
    } catch (err) {
        if (err) {
            console.error("Erro: ", err);
            res.status(500).send("Erro ao fazer login");
        }
    }
});

//quando tu mudou aqui, a imagem começou a deixar de aparecer
app.get("/signup", (req, res) => {
    res.render("signup.ejs");
});

app.post("/register", async (req, res) => {
    const { name, email, pass } = req.body;
    console.log(pass);

    const emailExists = await User.findOne({ email: email });
    if (!emailExists) {
        const hashedPass = bcrypt.hashSync(pass, salt);
        const newUser = new User({
            name,
            email,
            password: hashedPass,
        });
        await newUser.save();
        res.redirect("/login");
    } else {
        res.render("erro.ejs");
    }
});

app.listen(3000, () => console.log("rodando na porta 3000"));
