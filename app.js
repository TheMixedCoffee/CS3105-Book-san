const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mysql = require("mysql");

const urlEncodedParser = bodyParser.urlencoded({extended: false});
const app = express();

app.set('view engine', 'ejs');

app.use(express.static('./public'));
app.use(urlEncodedParser);

const connection = mysql.createConnection({
    host: "127.0.0.1",
    user: "root",
    password: "",
    database: "inventory"
})

connection.connect((err)=>{
    if (err) throw err;
    console.log("Database connected");
})

//Need to put na if get("/") niya wa ka login kay mo adto sa "/login", pero if naka login kay mo adto sa "/home"


app.get("/home", (req,res)=>{
    res.render('home', {title: "Home", navbarHeader: "Book-San", user: "Admin"});
})

app.get("/account", (req,res)=>{
    res.render('account', {title: "User Profile", navbarHeader: "User Profile"});
})

app.get("/add_product", (req,res)=>{
    res.render('add_product', {title: "Book-san Inventory", navbarHeader:"Product Inventory"})
})

app.get("/landing", (req,res)=>{
    res.render('landing', {title: "Book-san"})
})

app.post("/login", (req,res)=>{
//    let userPass = (using bcrypt)
    connection.query('SELECT username, password, isAdmin FROM `account` WHERE `username` ="'+req.params.username+'" && `password` ="'+userPass+'"', (err,results)=>{
        if(err) throw err;
        res.redirect("/home");
    })
})

app.listen(3000);