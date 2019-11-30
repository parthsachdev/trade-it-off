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

// Login Page
app.get("/login", (req, res) => {
    console.log("GET " + req.url);
    res.render("login.ejs");
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


// Login
app.post("/login/:user_id/:password", (req, res) => {
    var user_id = req.params.user_id;
    var password = req.params.password;
    var sql_query = "SELECT password FROM user WHERE user_id=" + user_id;
    conn.query(sql_query, (err, rows, fields) => {
        if (err) console.log(err);
        else {
            console.log(rows)
            // if (password==rows[0]) {
            //     res.render("landing.ejs", {
            //         user_id: user_id
            //     })
            // }
        }
    })
});
  



var server = app.listen(port, () => {
    var host = server.address().address;
    // var port = server.address().port;
    console.log("Server running on port "+ port + " and host " + host + ".");
});
