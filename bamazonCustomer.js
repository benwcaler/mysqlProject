var mysql = require("mysql");
var inquirer = require("inquirer");
var Table = require("cli-table2");
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
});

function itemDisplay() {
  //display all the items in the database
  var table = new Table({
    head: ["Item ID", "Name", "Department", "Price", "Stock"],
    chars: {
      top: "═",
      "top-mid": "╤",
      "top-left": "╔",
      "top-right": "╗",
      bottom: "═",
      "bottom-mid": "╧",
      "bottom-left": "╚",
      "bottom-right": "╝",
      left: "║",
      "left-mid": "╟",
      mid: "─",
      "mid-mid": "┼",
      right: "║",
      "right-mid": "╢",
      middle: "│"
    },
    colWidths: [9, 20, 16, 13, 7]
  });
  connection.query("SELECT * FROM products", function(err, res) {
    for (var i = 0; i < res.length; i++) {
      var item = [];
      item.push(
        res[i].item_id,
        res[i].product_name,
        res[i].department_name,
        "$" + res[i].price,
        res[i].stock_quantity
      );
      table.push(item);
    }
    console.log(table.toString());
    nowWhat();
  });
}

function nowWhat() {
  inquirer
    .prompt([
      {
        message: "Enter the item number of the item you would like to buy: ",
        type: "input",
        name: "id"
      },
      {
        message: "How many?",
        type: "input",
        name: "quantity"
      }
    ])
    .then(function(response) {
      // console.log(response.id, response.quantity)
      quantityCheck(response.id, response.quantity);
    });
}

function quantityCheck(id, quantity) {
  connection.query(
    "SELECT stock_quantity FROM products WHERE item_id = ?",
    [id],
    function(err, res) {
      if (quantity <= res[0].stock_quantity) {
        purchase(res[0].stock_quantity, quantity, id);
      } else {
        console.log("Insufficient stock!");
        nowWhat();
      }
    }
  );
}

function purchase(stock, quantity, id) {
  connection.query("UPDATE products SET ? where ?", [
    {
      stock_quantity: stock - quantity
  },
  {
    item_id: id
  }
  ], function(err,res) {
    print(quantity, id)
  })
}

function print(quantity, id) {
  connection.query("SELECT * FROM products WHERE item_id = ?", [id], function(err, res) {
    console.log("You bought " + quantity + " " + res[0].product_name + "'s for $" + res[0].price * quantity + ".")
  })
  connection.end()
}