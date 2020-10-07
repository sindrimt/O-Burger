// LAST EDITED BY:
// Torbjørn, 05.10.2020

// ========== GLOBAL VARIABLES ==========
// Config
var bannerHeight = 100;
var navBarHeight = 100;

var bodyEL = document.querySelector("body");
var bannerEL = null;
var navBarEL = null;
var itemTableEL;  // The links are inside of a table with 1 row
var itemRowEL;
var navItems =
[  // Template to use when creating navButtons
    {"display":"Home", "link":"index.html", "displayImg":"../imgs/OBurger-logo.png"},
    {"display":"O'rder", "link":"order.html"},
    {"display":"Find Restaurant", "link":"find_restaurant.html"},
    {"display":"O'bout Us", "link":"about.html"},
    {"display":"Contact Us", "link":"contact.html"}
];

// ========== FUNCTIONS ==========

function ResetAll()
{

    bannerEL = GetBanner();
    navBarEL = CreateNavBar();

    navBarEL.innerHTML = "";
    itemTableEL = document.createElement("table");
    itemRowEL = itemTableEL.insertRow();
    CreateNavItems();
    navBarEL.appendChild(itemTableEL);
    document.addEventListener("scroll", Scroll);
    ResetStyle();
    Scroll();  // So that the navBar starts at the correct position before scrolling
}

function CreateNavBarIfNonexistent()
{  // Creates a navBar ONLY if it doesn't exist already
    if (GetNavBar() != null) return;
    CreateNavBar();
}
function CreateNavBar()
{  // Creates a navBar. If one already exists, removes that one first.
    if (navBarEL != null)
    {
        // Delete previous navBar.
        navBarEL.parentNode.removeChild(navBarEL);
    }

    tempEL = document.createElement("div");
    tempEL.id = "navBar";
    GetBanner().appendChild(tempEL);
    return tempEL;
}
function GetNavBar()
{
    var tempEL = document.getElementById("navBar");
    if (tempEL == null) console.error("navBar.js ERROR: NavBar not found in document. NavBar should be automatically added inside the banner div. Did you forget to add a div with id='banner' in the HTML?");
    return tempEL;
}
function GetBanner()
{  // Looks for a banner in document, and if found, sets navBarEL to that. If not found, logs error.
    var tempEL = document.getElementById("banner");
    if (tempEL == null) console.error("navBar.js ERROR: Banner not found in document. Did you forget to add a div with id='banner' in the HTML?");
    return tempEL;
}
function CreateNavItems()
{
    for (var i = 0; i < navItems.length; i++)
    {  // i: navItem-index
        var itemCellEL = itemRowEL.insertCell();
        itemCellEL.className = "navCell";
        var thisItem = navItems[i];
        var thisDisplay = thisItem["display"];
        var thisLink = thisItem["link"];
        var itemWidth = screen.width/navItems.length;
        
        if ("displayImg" in thisItem)
        {  // Display an image instead of text
            var itemEL = document.createElement("img");
            itemEL.className = "navImg";
            itemEL.src = thisItem["displayImg"];
            itemEL.alt = thisDisplay;
            itemEL.style.height = navBarHeight+"px";
            
        } else
        {  // Display text
            var itemEL = document.createElement("button");
            itemEL.className = "navButton";
            itemEL.innerText = thisDisplay;
            itemEL.style.height = navBarHeight+"px";
            itemEL.style.width = itemWidth+"px";
        }

        
        itemCellEL.style.width = itemWidth+"px";
        itemEL.link = thisLink;
        itemEL.addEventListener("click", NavitemClicked);

        itemCellEL.appendChild(itemEL);
    }
}
function NavitemClicked(e)
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
function ResetStyle()
{
    navBarEL.style.height = navBarHeight+"px";
    bannerEL.style.height = navBarHeight+bannerHeight+"px";
}
function Scroll()
{
    var scroll = document.scrollingElement.scrollTop;
    var yPos = bannerHeight-scroll;
    if (yPos < 0) yPos = 0;

    navBarEL.style.top = yPos+"px";
    
    var imgHeight = navBarHeight+yPos;
    var navImgELs = document.getElementsByClassName("navImg");
    for (var i = 0; i < navImgELs.length; i++)
    {
        
        var imgEL = navImgELs[i];
        imgEL.style.height = imgHeight;
        console.log(imgHeight);
    }
}
// ========== INITIALIZATION ==========
ResetAll();