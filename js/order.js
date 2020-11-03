// ========== GLOBAL VARIABLES ==========
// Config
var reloadButtonText = "Back to order page";
var reloadText = "Thanks for your order! Your food will be ready in approximately never.";
var restaurants =
[
    {"name":"Honolulu"},
    {"name":"Las Vegas"},
    {"name":"San Francisco"},
    {"name":"Beverly Hills"},
    {"name":"Santa Monica"},
    {"name":"Fresno"}
];
var countIndex = 1;
var commonImgPath = "../imgs/order/";
var dishes =
[  // Dish blueprints are stored in objects
    {"name":"O'Burger",     "price":4.99, "img":"oburger.png"},
    {"name":"O'Fries",      "price":1.99, "img":"ofries.png"},
    {"name":"O'Shake",      "price":2.99, "img":"SHAKE.png"},
    {"name":"Soft Drink",   "price":1.99, "img":"softdrink.png"},
    {"name":"O'Curly",      "price":2.99, "img":"ocurly.png"},
    {"name":"O'Nuggets",    "price":2.99, "img":"onuggets.png"}
];
var receiptLine = "<br>";

// System variables
var bodyEL = document.querySelector("body");
var articleEL = document.getElementsByClassName("content")[0];
var dishesEL = null;
var receiptEL = null;
var formEL = null;


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
    displayNameEL.innerText = text;

    var imgWrapperEL = document.createElement("div");
    imgWrapperEL.className = "dishImgWrapper";
    var imgEL = document.createElement("img");
    imgEL.src = commonImgPath+dish["img"];
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
    var countEL = document.createElement("span");
    countEL.innerText = "0";
    var subtractButtonEL = document.createElement("img");
    subtractButtonEL.src = commonImgPath+"subtract.png";
    subtractButtonEL.addEventListener("click", DecreaseDishCount);
    subtractButtonEL.className = "dishButton";

    var addButtonEL = document.createElement("img");
    addButtonEL.src = commonImgPath+"add.png";
    addButtonEL.addEventListener("click", IncreaseDishCount);
    addButtonEL.className = "dishButton";
    wrapperEL.appendChild(subtractButtonEL);
    wrapperEL.appendChild(countEL);
    wrapperEL.appendChild(addButtonEL);
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
    UpdateForm();
}

// Everything to do with receipt
function CreateReceipt()
{
    if (receiptEL == null) 
    {
        receiptDivEL = document.createElement("div");
        receiptEL = document.createElement("span");
        receiptDivEL.appendChild(receiptEL);
    }
    receiptEL.innerText = "";
    articleEL.appendChild(receiptDivEL);

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
        var cost = Math.round((price*count) * 100) / 100;
        totalCost += cost;
        var txt = count+"x "+name+": $"+cost+"<br>";
        receipt += txt;
    }
    if (receipt != "")
    {
        totalCost = Math.round(totalCost*100)/100;
        var finalCost = "Total price: $"+totalCost;
        receiptEL.innerHTML = receipt+receiptLine+finalCost+"<br>";
        receiptDivEL.className = "orangeBorders"
    }
}
function CreateForm()
{
    if (formEL == null) 
    {
        formEL = document.createElement("form");
    }
    formEL.innerHTML = "";
    formEL.action = "";
    formEL.method = "POST";
    articleEL.appendChild(formEL);
}
function UpdateForm()
{
    // Restaurant, name, phone, email (receipt)
    formEL.innerHTML = "";
    var chooseRestaurantEL = document.createElement("select");
    var nameEL = document.createElement("input");
    var emailEL = document.createElement("input");
    var phoneEL = document.createElement("input");

    for (var i = 0; i < restaurants.length; i++)
    {
        var r = restaurants[i];
        var optionEL = document.createElement("option");
        optionEL.value = r["name"];
        optionEL.innerHTML = r["name"];
        chooseRestaurantEL.appendChild(optionEL);
    }


    nameEL.type = "text";
    nameEL.placeholder = "Full name";

    emailEL.type = "email";
    emailEL.placeholder = "E-mail (for receipt)";

    phoneEL.type = "number";
    phoneEL.min = "0";
    phoneEL.max = "99999999999";
    phoneEL.placeholder = "Phone number";

    var orderButtonEL = document.createElement("button");
    orderButtonEL.type = "button";
    orderButtonEL.id = "orderButton";
    orderButtonEL.className = "submitButton";
    orderButtonEL.innerHTML = "O'rder!";
    orderButtonEL.addEventListener("click", function(){Submit(reloadButtonText, reloadText);});

    formEL.appendChild(chooseRestaurantEL);
    formEL.innerHTML += "<br>";
    formEL.appendChild(nameEL);
    formEL.innerHTML += "<br>";
    formEL.appendChild(phoneEL);
    formEL.innerHTML += "<br>";
    formEL.appendChild(emailEL);
    formEL.innerHTML += "<br>";


    formEL.appendChild(orderButtonEL);

}

// ========== INITIALIZATION ==========
CreateDishes();
CreateReceipt();
CreateForm();