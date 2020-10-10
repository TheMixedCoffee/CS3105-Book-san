const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const mysql = require("mysql");

const urlEncodedParser = bodyParser.urlencoded({extended: false});
const app = express();

app.set('view engine', 'ejs');

app.use(express.static('./public'));
app.use(urlEncodedParser);

let isLoggedIn = 0; //Since we don't have sessions, we use this to temporarily tell if the user is logged in
let UID = -1; //User id when logging in


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


app.get("/", (req,res)=>{
    if(isLoggedIn == 0){
        res.redirect("/landing");
    }else{
        res.redirect("/home");
    }
})

app.get("/home", (req,res)=>{
    if(isLoggedIn == 0){
        res.redirect("/landing");
    }else{
        connection.query("SELECT username FROM account WHERE account_id = '" + UID + "'", (err, response)=>{
            if (err) throw err;
            let username = response[0]['username'];
            res.render('home', {title: "Home", navbarHeader: "Book-San", user: username});
        })
    }
})

app.get("/account", (req,res)=>{
    if(isLoggedIn == 0){
        res.redirect("/landing");
    }else{
        connection.query("SELECT username FROM account WHERE account_id = '" + UID + "'", (err, response)=>{
            if (err) throw err;
            let username = response[0]['username'];
            res.render('account', {title: "User Profile", navbarHeader: "User Profile", user: username});
        })
    }
})

app.get("/add_product", (req,res)=>{
    if(isLoggedIn == 0){
        res.redirect("/landing");
    }else{
            connection.query("SELECT username, isAdmin FROM account WHERE account_id = '" + UID + "'", (err, response)=>{
            if (err) throw err;
            if(response[0]['isAdmin'] == 1){
                let username = response[0]['username'];
                res.render('add_product', {title: "Book-san Products", navbarHeader: "Add/Edit Products", user: username});
            }else{
                res.redirect('back');
            }            
        })
    }
})

app.get(["/landing", "/landing/:status"], (req,res)=>{
    if(req.params.status == "logout"){
        UID = -1;
        isLoggedIn = 0;
    }
    res.render('landing', {title: "Book-san"});
})

app.post("/login", (req,res)=>{
    connection.query("SELECT * from account WHERE username = '"+req.body.username+"'", (err,response)=>{
        if(err) throw err;
        console.log(response);
        if(bcrypt.compareSync(req.body.password, response[0]['password'])){
            UID = response[0]['account_id'];
            isLoggedIn = 1;
            res.send({redirect: "/home"});
        //    res.send("true");
        }else{
        //    res.send("false");
            res.send({redirect: "/landing?error=1"});
        }
    })
})


// THIS SECTION WILL BE FOR INSERTING THINGS IN TO THE DATABASE USING POSTMAN //

app.post("/create_user", (req,res)=>{
    console.log(req.query);
    let salt = bcrypt.genSaltSync(saltRounds);
    let hash = bcrypt.hashSync(req.query.password, salt);
    connection.query("INSERT INTO account (username, password, isAdmin) VALUES ('"+ req.query.username + "', '"+hash+"', '"+req.query.isAdmin+"')", (err, response)=>{
        if (err) throw err;
        res.send("Here");
    })
})

app.post("/add_variant", (req,res)=>{
    connection.query("INSERT INTO variant (variant_name) VALUES ('"+ req.query.variant_name + "')", (err, response)=>{
        if (err) throw err;
        res.send("Here");
    })
})


//THIS SECTION WILL DISPLAY THE DIFFERENT TRANSACTIONS
app.get('/transactions_list', (req, res)=> {
    if(isLoggedIn == 0){
        res.redirect("/landing");
    }else{
        connection.query("SELECT username FROM account WHERE account_id = '" + UID + "'", (err, response)=>{
            if (err) throw err;
            let username = response[0]['username'];
            res.render('transactions', {title: "Transactions", navbarHeader: "Transactions List", user: username});
        })
    }
})

app.listen(3000);