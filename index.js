const bodyParser = require('body-parser');
const path = require('path');
const fs = require('fs');

const express = require('express');
const mysql = require('mysql');
const multer = require('multer');

const port = process.env.PORT || 3000;

var app = express();

// Set storage engine
const storage = multer.diskStorage({
    destination: "public/uploads/",
    filename: (req, file, callback) => {
            callback(null, file.fieldname+'-'+Date.now()+path.extname(file.originalname));
        }
});

// Init Upload
const upload = multer({
    storage: storage
}).single('uploadedImage');

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
    host: "sql12.freemysqlhosting.net",
    user: "sql12314111",
    password: "YPjbufNd5u",
    database: "sql12314111",
    multipleStatements: true
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
    sql_query = "SELECT * FROM products WHERE category='cars' AND status=1";
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
    sql_query = "SELECT * FROM products WHERE category='bikes' AND status=1";
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
    sql_query = "SELECT * FROM products WHERE category='furniture' AND status=1";
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
    sql_query = "SELECT * FROM products WHERE category='electronics' AND status=1";
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
        res.redirect("/login");
    }
    else {
        console.log("GET " + req.url);
        res.render("newproduct.ejs", {
            user_id: login_user_id
        });
    }
});

// Add product post
app.post("/newproduct", (req, res) => {
    var newproduct;
    upload(req, res, (err) => {
        if (err) {
            res.render('newproduct.ejs', {
            msg: err
            });
        }
        else {
            newproduct = {
                product_name: req.body.productname,
                user_id: login_user_id,
                price: req.body.price,
                category: req.body.category,
                img_url: "/uploads/"+req.file.filename, 
                description: req.body.description,
                status: 1
            };
            var sql_query = "INSERT INTO products SET ?";
            conn.query(sql_query, newproduct, (err, rows, fields) => {
                if (err) {
                    console.log(err);
                    throw err
                }
                else {
                    res.redirect("/");
                }
            });
        }
    });
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
        res.redirect("/login");
    }
    var sql_query = `SELECT * FROM products p, orders o WHERE o.buyer_id='${login_user_id}' AND o.product_id=p.product_id`;
    conn.query(sql_query, (err, rows, fields) => {
        if (err)
            console.log(err);
        else {
            res.render("orders.ejs", {
                products: rows
            });
        }
    });
});

// My Products
app.get("/myproducts", (req, res) => {
    if (!loggedIn) {
        res.redirect("/login");
    }
    var sql_query = `SELECT * FROM products p, orders o WHERE o.seller_id='${login_user_id}' AND o.product_id=p.product_id`;
    conn.query(sql_query, (err, rows, fields) => {
        if (err)
            console.log(err);
        else {
            res.render("myproducts.ejs", {
                products: rows
            });
        }
    });
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
app.get("/products/buy/:id/:seller", (req,res) => {
    if (!loggedIn) {
        res.redirect("/");
    }
    var product_id = req.params.id;
    var seller_id = req.params.seller;
    var buyer_id = login_user_id;
    var order = {
        seller_id: seller_id,
        buyer_id: buyer_id,
        product_id: product_id
    };

    var query = "UPDATE products SET status=0 WHERE product_id=?; INSERT INTO orders SET ?";
    conn.query(query, [product_id, order], function(err, product, fields){
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
    var sql_query = `INSERT INTO user SET ?`;
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
