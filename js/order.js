// ========== GLOBAL VARIABLES ==========
// Config
var countIndex = 1;
var dishes =
[  // Dish blueprints are stored in objects
    {"name":"O'Burger",     "price":4.99, "img":"../imgs/banner.jpg"},
    {"name":"O'Fries",      "price":1.99, "img":"../imgs/littkult.jpg"},
    {"name":"O'Shake",      "price":2.99, "img":"banner.jpg"},
    {"name":"Soft Drink",   "price":1.99, "img":"banner.jpg"},
    {"name":"O'Curly",      "price":2.99, "img":"banner.jpg"},
    {"name":"O'Nuggets",    "price":2.99, "img":"banner.jpg", "info":"10 pcs"}
];
var receiptLine = "<br>==========<br>";

// System variables
var bodyEL = document.querySelector("body");
var articleEL = document.getElementsByClassName("content")[0];
var dishesEL = null;
var receiptEL = null;


// ========== FUNCTIONS ==========

// Everything to do with dishes
function CreateDishes()
{  // Dishes means the menu items where you add and subtract dishes
    if (dishesEL == null)
    {
        dishesEL = document.createElement("div");
    } else
    {
        dishesEL.innerHTML = "";
    }

    for (var i = 0; i < dishes.length; i++)
    {
        dishesEL.appendChild(CreateDish(i));
    }
    articleEL.appendChild(dishesEL);
}
function CreateDish(dishIndex)
{
    var dish = dishes[dishIndex];
    var dishEL = document.createElement("div");
    dishEL.className = "dish";
    dishEL.dishIndex = dishIndex;  // Refers to the corresponding dish in dishes variable

    var displayNameEL = document.createElement("div");
    var text = dish["name"];
    if ("info" in dish) text += " (" + dish["info"] + ")";
    displayNameEL.innerText = text;

    var imgWrapperEL = document.createElement("div");
    imgWrapperEL.className = "dishImgWrapper";
    var imgEL = document.createElement("img");
    imgEL.src = dish["img"];
    imgEL.className = "dishImg";
    imgWrapperEL.appendChild(imgEL);

    var buttonsEL = CreateDishButtons();

    var priceEL = document.createElement("div");
    priceEL.innerText = "$"+dish["price"];

    dishEL.appendChild(displayNameEL);
    dishEL.appendChild(imgWrapperEL);
    dishEL.appendChild(buttonsEL);
    dishEL.appendChild(priceEL);
    return dishEL;
}
function CreateDishButtons()
{
    var wrapperEL = document.createElement("div");
    wrapperEL.className = "buttonWrapper";
    var addButtonEL = document.createElement("button");
    addButtonEL.addEventListener("click", IncreaseDishCount);
    addButtonEL.className = "dishButton";
    var countEL = document.createElement("span");
    countEL.innerText = "0";
    var subtractButtonEL = document.createElement("button");
    subtractButtonEL.addEventListener("click", DecreaseDishCount);
    subtractButtonEL.className = "dishButton";
    wrapperEL.appendChild(addButtonEL);
    wrapperEL.appendChild(countEL);
    wrapperEL.appendChild(subtractButtonEL);
    return wrapperEL;
}
function IncreaseDishCount(e) {ChangeDishCount(e, 1);}
function DecreaseDishCount(e) {ChangeDishCount(e, -1);}
function ChangeDishCount(e, amount)
{
    var countEL = e.target.parentNode.childNodes[countIndex];
    var count = parseInt(countEL.innerText);
    count += amount;
    if (count < 0) count = 0;
    if (count > 99) count = 99;
    countEL.innerText = count;

    UpdateReceipt();
}

// Everything to do with receipt
function CreateReceipt()
{
    if (receiptEL == null) 
    {
        receiptEL = document.createElement("span");
    }
    receiptEL.innerText = "";
    articleEL.appendChild(receiptEL);
}
function UpdateReceipt()
{
    if (receiptEL == null || dishesEL == null)
    {   
        console.error("ERROR: either receiptEL or dishesEL is null");
        return;
    }
    receiptEL.innerHTML = "";
    var dishELs = dishesEL.childNodes;
    var receipt = "";
    var totalCost = 0;
    for (var i = 0; i < dishELs.length; i++)
    {
        var dishEL = dishELs[i];
        var count = parseInt(dishEL.childNodes[2].childNodes[countIndex].innerText);

        if (count == 0) continue;
        var dishIndex = dishEL.dishIndex;
        var dishBP = dishes[dishIndex];
        var name = dishBP["name"];
        var price = dishBP["price"];
        var info = "";
        if ("info" in dishBP) info = dishBP["info"];
        var cost = Math.round((price*count) * 100) / 100;
        totalCost += cost;
        var txt = count+"x "+name+": $"+cost+";<br>";
        receipt += txt;
    }
    if (receipt != "")
    {
        var finalCost = "Total price: $"+totalCost;
        receiptEL.innerHTML = receiptLine+receipt+receiptLine+finalCost;
    }
}

// ========== INITIALIZATION ==========
CreateDishes();
CreateReceipt();