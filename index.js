const express = require('express');
const mysql = require('mysql');
const port = 3031;

var app = express();

// Static directory: public
app.use(express.static(__dirname+"/public"));
app.set('view engine', 'ejs');

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

// Home Page
app.get("/", (req, res) => {
    console.log("GET " + req.url);
    res.render("landing.ejs");
});

// Sample Modal (pop-up window)
app.get("/modal", (req, res) => {
    console.log("GET " + req.url);
    res.render("modal.ejs");
});

// Login Page
app.get("/login", (req, res) => {
    console.log("GET " + req.url);
    res.render("login.ejs");

    // Change the login button to name of Account
});

// Signup Page
app.get("/signup", (req, res) => {
    console.log("GET " + req.url);
    res.render("signup.ejs");
});

// Orders Page
app.get("/orders", (req, res) => {
    console.log("GET " + req.url);
    res.render("orders.ejs");
});

// Cart Page
app.get("/cart", (req, res) => {
    console.log("GET " + req.url);
    res.render("cart.ejs");
});

// Products Card - one specific product
app.get("/product", (req, res) => {
    console.log("GET " + req.url);
    sql_query = "SELECT * FROM products";
    conn.query(sql_query, (err, rows, fields) => {
        console.log(rows);
    });
    // get information about the product and send an object
    // var prod = {}
    res.render("product.ejs");
});

// See database
app.get("/database", (req, res) => {
    console.log("GET " + req.url);
    res.render("database.ejs");
});

// Products Page
app.get("/products", (req, res) => {
    var sql_query = "SELECT * FROM products";
    conn.query(sql_query, (err, rows, fields) => {
        if (err) {
            console.log(err);
        } else {
            res.render("products.ejs", {
                products: rows
            });
        }
    });
});



var server = app.listen(port, () => {
    var host = server.address().address;
    // var port = server.address().port;
    console.log("Server running on port "+ port + " and host " + host + ".");
});
