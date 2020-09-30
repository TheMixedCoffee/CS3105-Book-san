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
    database: "booksanDB"
})

connection.connect((err)=>{
    if (err) throw err;
    console.log("Database connected");
})

app.listen(3000);