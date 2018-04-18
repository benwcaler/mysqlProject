var Table = require("cli-table2");
var inquirer = require("inquirer");
var mysql = require("mysql");
var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "test",
  database: "bamazon"
});

connection.connect(function (err) {
  if (err) throw err;
  menu();
  // whatToDo();
});

function menu() {
  inquirer
    .prompt([
      {
        type: "list",
        message: "Make a selection",
        choices: [
          "View Products for Sale",
          "View Low Inventory",
          "Add to Inventory",
          "Add New Product",
          "Exit"
        ],
        name: "choices"
      }
    ])
    .then(function (response) {
      switch (response.choices) {
        case "View Products for Sale":
          inventory();
          break;
        case "View Low Inventory":
          lowInventory();
          break;
        case "Add to Inventory":
          add();
          break;
        case "Add New Product":
          newProduct();
          break;
        case "Exit":
          connection.end()
      }
    });
}

function inventory() {
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
  connection.query("SELECT * FROM products", function (err, res) {
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
    menu();
  });
}

function lowInventory() {
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
  connection.query("SELECT * FROM products WHERE stock_quantity < 5", function (err, res) {
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
    menu();
  });
}

function add() {
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
  connection.query("SELECT * FROM products", function (err, res) {
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
    inquirer.prompt([
      {
        type: "input",
        message: "Enter id of item to restock",
        name: "item"
      },
      {
        type: "input",
        message: "Enter quantity to add",
        name: "quantity"
      }
    ]).then(function (response) {
      connection.query("SELECT stock_quantity FROM products WHERE item_id = " + response.item, function (err, res) {
        var newStock;
        newStock = parseInt(res[0].stock_quantity) + parseInt(response.quantity)
        console.log(newStock);
        connection.query("UPDATE products SET ? WHERE ?",
          [
            {
              stock_quantity: newStock
            },
            {
              item_id: response.item
            }
          ], function (err) {
            if (err) throw err;
            console.log("Stock updated");
            menu();
          });
      });
    });
  });
}

function newProduct() {
  inquirer.prompt([
    {
      type: "input",
      message: "Enter product name",
      name: "name"
    },
    {
      type: "input",
      message: "Enter department",
      name: "department",
    },
    {
      type: "input",
      message: "Enter product price",
      name: "price"
    },
    {
      type: "input",
      message: "Enter stock quantity",
      name: "stock"
    }
  ]).then(function (response) {
    connection.query("INSERT INTO products SET ?",
      {
        product_name: response.name,
        department_name: response.department,
        price: response.price,
        stock_quantity: response.stock
      }, function (err) {
        if (err) throw err;
        console.log("Item entered");
        menu();
      });
  });
}