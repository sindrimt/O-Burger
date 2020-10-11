// ========== GLOBAL VARIABLES ==========
// Config
var dishes =
[  // Dish blueprints are stored in objects
    {"name":"O'Burger",     "price":4.99, "img":"banner.jpg"},
    {"name":"O'Fries",      "price":1.99, "img":"banner.jpg"},
    {"name":"O'Shake",      "price":2.99, "img":"banner.jpg"},
    {"name":"Soft Drink",   "price":1.99, "img":"banner.jpg"},
    {"name":"O'Curly",      "price":2.99, "img":"banner.jpg"},
    {"name":"O'Nuggets",    "price":2.99, "img":"banner.jpg", "info":"10 pcs"}
];

// System variables
var bodyEL = document.querySelector("body");
var articleEL = document.getElementsByClassName("content")[0];


// ========== FUNCTIONS ==========
function CreateDishes()
{  // Dishes means the menu items where you add and subtract dishes
    var dishesEL = document.createElement("div");

    for (var i = 0; i < dishes.length; i++)
    {
        var dish = dishes[i];
        dishesEL.appendChild(CreateDish(dish));
    }
    articleEL.appendChild(dishesEL);
}
function CreateDish(dish)
{
    var dishEL = document.createElement("div");
    dishEL.className = "dish";

    var displayNameEL = document.createElement("div");
    var text = dish["name"];
    if ("info" in dish) text += " (" + dish["info"] + ")";
    displayNameEL.innerText = text;

    var imgEL = document.createElement("img");
    imgEL.src = dish["img"];

    var buttonsEL = CreateDishButtons();

    var priceEL = document.createElement("div");
    priceEL.innerText = "$"+dish["price"];

    dishEL.appendChild(displayNameEL);
    dishEL.appendChild(imgEL);
    dishEL.appendChild(buttonsEL);
    dishEL.appendChild(priceEL);
    return dishEL;
}
function CreateDishButtons()
{
    var wrapperEL = document.createElement("div");

    var addButtonEL = document.createElement("img");
    var countEL = document.createElement("span");
    var subtractButtonEL = document.createElement("img");
    wrapperEL.appendChild(addButtonEL);
    wrapperEL.appendChild(countEL);
    wrapperEL.appendChild(subtractButtonEL);
    wrapperEL.innerText += "13";
    return wrapperEL;
}

// ========== INITIALIZATION ==========
CreateDishes();