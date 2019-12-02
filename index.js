const bodyParser = require('body-parser');
const http = require('http');
const path = require('path');
const fs = require('fs');

const express = require('express');
const mysql = require('mysql');
const multer = require('multer');

const port = 3031;

var app = express();
const httpServer = http.createServer(app);

// Static directory: public
app.use(express.static(__dirname+"/public"));

app.use(bodyParser.urlencoded({extended: true}));
app.set('view engine', 'ejs');

// login status
var loggedIn = false;
var login_user_id = "";

// MySQL connection setup
var conn = mysql.createConnection({
    connectionLimit: 50,
    host: "localhost",
    user: "parth",
    password: "parth_admin",
    database: "ecommerce"
});
conn.connect((err) => {
    if (err) {
        console.log(err);
    }   else {
        console.log("Connection to MySQL server successful.");
    }
});


app.use((req, res, next) => {
    res.locals.loggedIn = loggedIn;
    res.locals.login_user_id = login_user_id;
    next();
});

// Home Page and All Products Page
app.get("/", (req, res) => {
    console.log("GET " + req.url);
    var sql_query = "SELECT * FROM products WHERE status=1";
    conn.query(sql_query, (err, rows, fields) => {
        if (err) {
            console.log(err);
        } else {
            res.render("landing.ejs", {
                products: rows
            });
        }
    });
});

// Category Cars
app.get("/cars", (req, res) => {
    sql_query = "SELECT * FROM PRODUCTS WHERE category='cars' AND status=1";
    conn.query(sql_query, (err, rows, fields) => {
        if (err) {
            console.log(err);
        }
        else {
            console.log("GET " + req.url);
            res.render("cars.ejs", {
                products: rows
            });
        }
    })
});

// Category Bikes
app.get("/bikes", (req, res) => {
    sql_query = "SELECT * FROM PRODUCTS WHERE category='bikes' AND status=1";
    conn.query(sql_query, (err, rows, fields) => {
        if (err) {
            console.log(err);
        }
        else {
            console.log("GET " + req.url);
            res.render("bikes.ejs", {
                products: rows
            });
        }
    })
});

// Category Furniture
app.get("/furniture", (req, res) => {
    sql_query = "SELECT * FROM PRODUCTS WHERE category='furniture' AND status=1";
    conn.query(sql_query, (err, rows, fields) => {
        if (err) {
            console.log(err);
        }
        else {
            console.log("GET " + req.url);
            res.render("furniture.ejs", {
                products: rows
            });
        }
    })
});

// Category Electronics
app.get("/electronics", (req, res) => {
    sql_query = "SELECT * FROM PRODUCTS WHERE category='electronics' AND status=1";
    conn.query(sql_query, (err, rows, fields) => {
        if (err) {
            console.log(err);
        }
        else {
            console.log("GET " + req.url);
            res.render("electronics.ejs", {
                products: rows
            });
        }
    })
});

// Add Product Page
app.get("/newproduct", (req, res) => {
    if (!loggedIn) {
        res.redirect("/");
    }
    else {
        console.log("GET " + req.url);
        res.render("newproduct.ejs", {
            user_id: login_user_id
        });
    }
});


// Login Page
app.get("/login", (req, res) => {
    console.log("GET " + req.url);
    res.render("login");
});

// Signup Page
app.get("/signup", (req, res) => {
    console.log("GET " + req.url);
    res.render("signup");
});

// Orders Page
app.get("/orders", (req, res) => {
    if (!loggedIn) {
        res.redirect("/");
    }
    else {
        console.log("GET " + req.url);
        res.render("orders.ejs");
    }
});

// Product page with product_id
app.get("/products/:id", (req, res) => {
    var pid = req.params.id;
    var sql_query = "select * from products where product_id=" + pid;
    conn.query(sql_query, (err, product, fields) => {
      if(err){
        console.log(err);
      }
      else{
        res.render("show1.ejs",{product: product[0]});
      }
    });
});

// Buy Now
app.get("/products/buy/:id/:name/:cost/:category/:seller", (req,res) => {
    var product_id = req.params.id;
    var seller_id = req.params.seller;

    var query = "UPDATE products SET status=0 WHERE product_id=?";
    conn.query(query, product_id, function(err, product, fields){
        if(err){
            console.log(err);
        }
        else{
            res.render("buy.ejs", {seller_id:seller_id});
        }
    });
});

// Signout
app.get("/signout", (req, res) => {
    loggedIn = false;
    login_user_id = "";
    res.locals.loggedIn = false;
    res.locals.login_user_id = "";
    res.redirect("/");
});


// Login
app.post("/login", (req, res) => {
    var user_id = req.body.userid;
    var password = req.body.password;
    var sql_query = `SELECT password FROM user WHERE user_id='${user_id}'`;
    conn.query(sql_query, (err, rows, fields) => {
        if (err){
            console.log(err);
        }    
        else {
            console.log(rows);
            if (rows.length == 0) {
                res.redirect("/login");
            }
            else if (password==rows[0]['password']) {
                loggedIn = true;
                login_user_id = user_id;
                res.locals.loggedIn = true;
                res.locals.login_user_id = user_id;
                res.redirect("/");
            }
            else {
                res.redirect("/login");
            }
        }
    });
});

// Signup
app.post("/signup", (req, res) => {
    var newuser = {
        user_id: req.body.userid,
        name: req.body.name,
        address: req.body.address,
        phone: req.body.phone,
        password: req.body.password
    };
    var sql_query = `INSERT INTO USER SET ?`;
    conn.query(sql_query, newuser, (err, rows, fields) => {
        if (err) {
            console.log(err);
        }
        else {
            console.log(`Success: ${rows}`);
            loggedIn = true;
            login_user_id = newuser.user_id;
            res.locals.loggedIn = true;
            res.locals.login_user_id = newuser.user_id;
            res.redirect("/");
        }
    });

})
  


// Start the server
var server = app.listen(port, () => {
    var host = server.address().address;
    console.log("Server running on port "+ port + " and host " + host + ".");
});

httpServer.listen(3000, () => {
    console.log("HTTP Server id listening");
})