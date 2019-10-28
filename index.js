const express = require('express');
const mysql = require('mysql');
const port = 3031;

app = express();

// Static directory: public
app.use(express.static(__dirname+"/public"));
app.set('view engine', 'ejs');

// MySQL connection setup
var conn = mysql.createConnection({
    host: "localhost",
    user: "parth",
    password: "",
    database: "ecommerce"
});
conn.connect((err) => {
    if (err) {
        console.log(err);
    }
    console.log("Connection to MySQL server successful.");
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

// Products Page
// app.get("/products", (req, res) => {
//     var sql_query = "SELECT * FROM products";
//     conn.query(sql_query, (err, products, fields) => {
//         if (err) {
//             console.log(err);
//         } else {
//             res.render("products.ejs", {
//                 products: products
//             });
//         }
//     });
// });



app.get("/process_get", (req, res) => {
    var response = {
        first_name: req.query.first_name
    };
    console.log(response);
    res.send(response);
});

var server = app.listen(port, () => {
    var host = server.address().address;
    // var port = server.address().port;
    console.log("Server running on port "+ port + " and host " + host + ".");
});
