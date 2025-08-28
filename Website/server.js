var express = require("express"); //using the express framework
var db = require('./db-connections');
var app = express(); // set variable app to be an instance of express framework. From now on, app is the express

app.use(express.json()); // json() is a method inbuilt in express to recognize the incoming Request Object from the web client as a JSON Object.



app.route('/addproduct').post(function(req, res) {
  var sql = "INSERT INTO PRODUCT (name, description, price, category_id, picture) VALUES (?, ?, ?, ?, ?)";
  var parameter = [req.body.name, req.body.description, req.body.price, req.body.category_id, req.body.picture];

  db.query(sql, parameter, function(error, result) {
    if(error){
      throw error;
    }else{
      res.json(result);
    };
  });
});


app.route('/deleteProductDetails/:id').delete(function (req, res) {
  var sql = "DELETE FROM product WHERE id = ?";
  var parameters = [req.params.id];

  db.query(sql, parameters, function(error, result){
      if(error){
          console.error("Error deleting product:", error);
          res.status(500).json({ message: "Failed to delete product." });
      } else {
          console.log("Product deleted successfully.");
          res.status(200).json({ message: "Product deleted successfully." });
      }
  });
});



app.route('/category').get(function(req, res) {
  var sql = "SELECT * FROM `CATEGORY`";

  db.query(sql, function(error, result) {
    if (error) {
      throw error;
    }else{
      res.json(result);
    }
  });
});


app.route("/product").get(function(req, res){
    var sql = "SELECT product.id, product.name, product.description, product.price, product.category_id, product.picture, category.name as category FROM product join category on product.category_id = category.id";
    db.query(sql, function(error, result){
      if (error){
        throw error;
      }else{
        res.json(result);
      }
    });
});


app.route('/productDetails/:id').get(function(req, res) {
  
  var sql = "SELECT * FROM `product` WHERE id = ?";
  var parameter = [req.params.id];

  db.query(sql, parameter, function(error, result) {
    if(error){
      throw error;
    }else{
      res.json(result);
    };
  });
});


app.route('/categoryProduct/:category_id').get(function(req, res) {
  var sql = "SELECT product.id, product.name, product.description, product.price, product.category_id, product.picture, category.name as category FROM product join category on product.category_id = category.id WHERE category_id = ?";

  var parameters = [req.params.category_id];

  db.query(sql, parameters, function(error, result) {
    if (error) {
      throw error;
    }else{
      res.json(result);
    }
  });
});

app.route('/updateProduct/:id').put(function(req, res){
  var sql = "UPDATE product SET name = ?, description = ?, price = ?, category_id = ?, picture = ? WHERE id = ?";
  var parameter = [req.body.name, req.body.description, req.body.price, req.body.category_id, req.body.picture, req.params.id];

  db.query(sql, parameter, function(error, result){
    if (error) {
      console.log("update fail");
      console.error("Error updating product:", error);
      res.status(500).json({ message: "Failed to update product." });
    } else {
      console.log("update passed")
      console.log("Product updated successfully.");
      res.status(200).json({ message: "Product updated successfully." });
    };
  });
});

//This the method makes sure that there is a static website directory(All html pages must be under public folder)
const path=require('path')
app.use(express.static(path.join(__dirname,'public')))


app.listen(8080, "127.0.0.1"); // start the nodejs to be listening for incoming request @ port 8080
console.log("web server running @ http://127.0.0.1:8080"); // output to console 






