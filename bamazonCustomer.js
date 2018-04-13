var mysql = require("mysql");
var inquirer = require("inquirer");
var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "test",
  database: "bamazon"
});

connection.connect(function(err) {
  if (err) throw err;
  itemDisplay();
  // whatToDo();
})

function itemDisplay() {
  //display all the items in the database
  connection.query("SELECT * FROM products", function(err, res) {
    console.log(res);
  })
}