const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const mysql = require("mysql");
const session = require('express-session');
const { response } = require("express");

const urlEncodedParser = bodyParser.urlencoded({extended: true});
const app = express();

app.set('view engine', 'ejs');

app.use(express.static('./public'));
app.use(urlEncodedParser);
app.use(bodyParser.json());
app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true,
}));

let isLoggedIn = 0; //Since we don't have sessions, we use this to temporarily tell if the user is logged in
let UID = -1; //User id when logging in
let transactData;
let products;

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

//Isaiah's code
/*app.get("/", (req,res)=>{
    if(isLoggedIn == 0){
        res.redirect("/landing");
    }else{
        res.redirect("/home");
    }
})*/

app.get("/", (req,res)=>{
    if (req.session.loggedin) {
		res.redirect("/home");
	} else {
		res.redirect("/landing");
	}
})

app.post("/auth", (req,res)=>{
    connection.query("SELECT * FROM account WHERE username = '" + req.body.username + "'", (err, response)=>{
        if(err) throw err;
        if (response.length > 0) {
            if(bcrypt.compareSync(req.body.password, response[0]['password'])){
                req.session.loggedin = true;
                req.session.username = req.body.username;
                req.session.isAdmin = response[0].isAdmin;
                res.send({redirect: "/home"});
            }else{
                res.send({redirect: "/landing?error=1"});
            }
        }else{
            res.send({redirect: "/landing?error=1"});
        } 
    })
})

//Isaiah's code
/*app.get("/home", (req,res)=>{
    if(isLoggedIn == 0){
        res.redirect("/landing");
    }else{
        connection.query("SELECT username FROM account WHERE account_id = '" + UID + "'", (err, response)=>{
            if (err) throw err;
            let username = response[0]['username'];
            res.render('home', {title: "Home", navbarHeader: "Book-San", user: username});
        })
    }
})*/

app.get("/home", (req,res)=>{
    if (req.session.loggedin) {
        let username = req.session.username;
		res.render('home', {title: "Home", navbarHeader: "Book-San", user: username});
	} else {
		res.redirect("/landing");
	}
})

app.get("/account", (req,res)=>{
    // if(isLoggedIn == 0){
    //     res.redirect("/landing");
    // }else{
    //     connection.query("SELECT username FROM account WHERE account_id = '" + UID + "'", (err, response)=>{
    //         if (err) throw err;
    //         let username = response[0]['username'];
    //         res.render('account', {title: "User Profile", navbarHeader: "User Profile", user: username});
    //     })
    // }
    if (req.session.loggedin) {
        let username = req.session.username;
		res.render('account', {title: "User Profile", navbarHeader: "User Profile", user: username});
    }else{
        res.redirect("/landing");
    }
})

app.get("/add_product", (req,res)=>{
    // if(isLoggedIn == 0){
    //     res.redirect("/landing");
    // }else{
    //         connection.query("SELECT username, isAdmin FROM account WHERE account_id = '" + UID + "'", (err, response)=>{
    //         if (err) throw err;
    //         if(response[0]['isAdmin'] == 1){
    //             let username = response[0]['username'];
    //             connection.query("SELECT * FROM item", (err, result)=>{
    //                 res.render('add_product', {title: "Book-san Products", navbarHeader: "Add/Edit Products", user: username, product: result});
    //             })
    //         }else{
    //             res.redirect('back');
    //         }            
    //     })
    // }
    if (req.session.loggedin) {
        if(req.session.isAdmin == 1){
            let username = req.session.username;
            connection.query("SELECT * FROM item", (err, result)=>{
                if (err) throw err; 
                res.render('add_product', {title: "Book-san Products", navbarHeader: "Add/Edit Products", user: username, product: result});
            })
        }else{
            res.redirect('back');
        }
    }else{
        res.redirect("/landing");
    }
})

app.post("/add_product", (req,res)=>{
 //   connection.query("INSERT ")
})

app.get(["/landing", "/landing/:status"], (req,res)=>{
    if(req.params.status == "logout"){
        if (req.session.loggedin) {
            req.session.destroy();
        }
        // UID = -1;
        // isLoggedIn = 0;
    }
    res.render('landing', {title: "Book-san"});
})

// app.post("/login", (req,res)=>{
//     connection.query("SELECT * from account WHERE username = '"+req.body.username+"'", (err,response)=>{
//         // if(err) throw err;
//         if(bcrypt.compareSync(req.body.password, response[0]['password'])){
//             UID = response[0]['account_id'];
//             isLoggedIn = 1;
//             res.send({redirect: "/home"});
//         //    res.send("true");
//         }else{
//         //    res.send("false");
//             res.send({redirect: "/landing?error=1"});
//         }
//     })
// })


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
    if (req.session.loggedin) {
        let username = req.session.username;
        connection.query("SELECT order_t.account_id, order_t.total_price, order_t.order_date, account.account_id, order_t.item_id, account.username FROM order_t INNER JOIN account ON account.account_id=order_t.account_id;", (err, response)=> {
            if(err) throw err;
            transactData = response;
            res.render('transactions', {title: "Book-san Transactions", navbarHeader: "Transactions List", user: username, transactions: transactData});
        });
	} else {
		res.redirect("/landing");
	}
})

//ADD AND INSERT TRANSACTIONS
app.get('/add_transaction', (req, res)=> {
    if (req.session.loggedin) {
        let username = req.session.username;
        connection.query("SELECT item.item_id, item.item_name, item_variant.item_id, item_variant.variant_id, item_variant.item_price, item_variant.item_stock, variant.variant_id, variant.variant_name  FROM ((item INNER JOIN item_variant ON item.item_id = item_variant.item_id) INNER JOIN variant ON variant.variant_id = item_variant.variant_id);", (err, response)=> {
            // if (err) throw err;
            products = response;
            res.render("add_transactions", {title: "Add Transactions", navbarHeader: "Add Transactions", user: username, product: products}); 
        })
	} else {
		res.redirect("/landing");
	}
})




app.listen(3000);