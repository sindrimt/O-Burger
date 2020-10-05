// LAST EDITED BY:
// Torbjørn, 05.10.2020

// ========== GLOBAL VARIABLES ==========
var navbarEL;
var buttonTableEL;  // The links are inside of a table with 1 row
var buttonRowEL;
var navbuttons =
[  // Template to use when creating navbuttons
    {"display":"Home", "link":"index.html"},
    {"display":"O'rder", "link":"order.html"},
    {"display":"Find Restaurant", "link":"find_restaurant.html"},
    {"display":"O'bout Us", "link":"about.html"},
    {"display":"Contact Us", "link":"contact.html"}
];

// ========== FUNCTIONS ==========

function ResetNavbar()
{
    navbarEL = GetNavbar();
    if (navbarEL == null) return;
    console.log(navbarEL);
    navbarEL.innerHTML = "";

    buttonTableEL = document.createElement("table");
    buttonRowEL = buttonTableEL.insertRow();
    CreateNavbuttons();

    navbarEL.appendChild(buttonTableEL);
}
function GetNavbar()
{  // Looks for a navbar in document, and if found, sets navbarEL to that. If not found, logs error.
    var tempEL = document.getElementById("navbar");
    if (tempEL == null) console.error("ERROR: Navbar not found in document. Did you forget to add a div with id='navbar' in the HTML?");
    return tempEL;
}
function CreateNavbuttons()
{
    for (var i = 0; i < navbuttons.length; i++)
    {  // i: navbutton-index
        var buttonCellEL = buttonRowEL.insertCell();
        var buttonEL = document.createElement("button");

        var thisButton = navbuttons[i];
        var thisDisplay = thisButton["display"];
        var thisLink = thisButton["link"];

        buttonCellEL.className = "navcell";
        buttonEL.className = "navbutton";
        buttonEL.innerText = thisDisplay;
        buttonEL.link = thisLink;
        buttonEL.addEventListener("click", NavbuttonClicked);

        buttonCellEL.appendChild(buttonEL);
    }
}
function NavbuttonClicked(e)
{
    if (e == null)
    {
        console.error("ERROR: nonexistent button was clicked?");
        return;
    }
    var link = e.target.link;
    window.location.href = link;  // if back button should bring user to previous O'Burger page
    //windiw.location.replace(link);  // if back button should bring user out of O'Burger altogether
}

// ========== INITIALIZATION ==========
ResetNavbar();