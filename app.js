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
    if (req.session.loggedin) {
        let username = req.session.username;
		res.render('account', {title: "User Profile", navbarHeader: "User Profile", user: username});
    }else{
        res.redirect("/landing");
    }
})

app.get("/add_product", (req,res)=>{
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


//THIS IS FOR THE ADD PRODUCT MODAL
app.post("/add_product", (req,res)=>{
    connection.query("INSERT INTO item (item_name, item_desc, item_author) VALUES ('"+ req.body.productName + "','"+req.body.productDesc+"','"+req.body.productAuthor+"')", (err,response)=>{{
        if (err) throw err;
        item_name = req.body.productName;
        console.log(item_name);
        console.log(req.body.variantList);
        connection.query("SELECT item_id FROM item where item_name = '" + item_name + "'", (err, result)=>{
            if (err) throw err;
            item_id = result[0].item_id;
            for( let i = 0; i < req.body.variantList.length; i++){
                connection.query("SELECT variant_id FROM variant WHERE variant_name IN ('" + req.body.variantList[i].name + "')", (err,output)=>{
                    if (err) throw err;
                    variant_id = output[0].variant_id;
                    console.log("variant id:" + variant_id);
                    connection.query("INSERT INTO item_variant (variant_id, item_id, item_price, item_stock, isActive) VALUES ('" + variant_id +"',"+"'"+ item_id +"'," + "'" + req.body.variantList[i].price + "'," + "'" + req.body.variantList[i].stock + "',"+ 1 +")",(err,response)=>{
                        if (err) throw err;
                    })
                })
            }
        })
    }})
    res.redirect("/add_product");
})

//THIS IS FOR THE DELETE MODAL
app.post("/remove_product", (req,res)=>{
    let variantNameList = [];
    connection.query("SELECT item_id FROM item where item_name ='" + req.body.removeProductName + "'", (err,response)=>{
        if (err) throw err;
        item_id = response[0].item_id;
        connection.query("SELECT variant_id FROM item_variant WHERE item_id = '" + item_id + "'", (err,result)=>{
            if (err) throw err;
            variant_id = result;
            var completed = 0;
            for(let i = 0; i<variant_id.length; i++){
                connection.query("SELECT variant_name FROM variant WHERE variant_id ='"+ variant_id[i].variant_id + "'", (err,output)=>{
                    if (err) throw err;
                    completed++;
                    console.log("output[0].variant_name:" + output[0].variant_name);
                    variantNameList.push(output[0].variant_name);
                    console.log(variantNameList[i]);
                    console.log("variantNameList during loop" + i + " " + variantNameList);
                    if(completed == variant_id.length){
                        console.log("variantNameList before send" +  variantNameList);
                        res.send({variant_name_list:variantNameList});
                    }
                })
            }
        })
    })
})

app.post("/remove_product_variant", (req,res)=>{
    connection.query("SELECT variant_id from variant WHERE variant_name = ")
})

app.get(["/landing", "/landing/:status"], (req,res)=>{
    if(req.params.status == "logout"){
        if (req.session.loggedin) {
            req.session.destroy();
        }
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