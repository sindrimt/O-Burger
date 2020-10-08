// LAST EDITED BY:
// Torbjørn, 05.10.2020

// ========== GLOBAL VARIABLES ==========
// Config
var bannerHeight = 60;
var navBarHeight = 80;
var minimizedImageHeight = 1.25;  // as a fraction of navBarHeight
var imageCellWidthWeight = 0.5;  // Button cells have a weight of 1

var bodyEL = document.querySelector("body");
var bannerEL = null;
var navBarEL = null;
//var itemTableEL;  // The links are inside of a table with 1 row
//var itemRowEL;
var navItems =
[  // Template to use when creating navButtons
    {"display":"Home", "link":"index.html", "displayImg":"../imgs/OBurger-logo-cropped.png"},
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
    /*
    itemTableEL = document.createElement("table");
    itemRowEL = itemTableEL.insertRow();
    */
    CreateNavItems();
    /*
    navBarEL.appendChild(itemTableEL);
    */
    document.addEventListener("scroll", UpdateNavbar);
    window.addEventListener("resize", UpdateNavbar);
    ResetStyle();
    UpdateNavbar();  // So that the navBar starts at the correct position before scrolling
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
    var weightSum = GetNavItemWeightSum();
    for (var i = 0; i < navItems.length; i++)
    {  // i: navItem-index
        var itemCellEL = document.createElement("span");
        itemCellEL.className = "navCell";
        var thisItem = navItems[i];
        var thisDisplay = thisItem["display"];
        var thisLink = thisItem["link"];
        var itemWidth = 100/weightSum;

        if ("displayImg" in thisItem)
        {  // Display an image instead of text
            var itemEL = document.createElement("img");
            itemEL.className = "navImg";
            // Images need to be loaded in order to get their width and height,
            // which is necessary for the page to look alright.
            itemEL.addEventListener("load", UpdateNavbar);
            itemEL.src = thisItem["displayImg"];
            itemEL.alt = thisDisplay;
            itemEL.style.height = navBarHeight+"px";
            
        } else
        {  // Display text
            var itemEL = document.createElement("button");
            itemEL.className = "navButton";
            itemEL.innerText = thisDisplay;
            itemEL.style.height = navBarHeight+"px";
            
            console.log(itemWidth);
        }

        itemCellEL.style.width = itemWidth+"%";
        itemCellEL.style.height = navBarHeight+"px";
        itemEL.link = thisLink;
        itemEL.addEventListener("click", NavItemClicked);

        itemCellEL.appendChild(itemEL);
        navBarEL.appendChild(itemCellEL);
    }
}
function GetNavItemWeightSum()
{
    var sum = 0;
    for (var i = 0; i < navItems.length; i++)
    {
        var item = navItems[i];
        if ("img" in item) sum += logoCellWidthWeight;
        else sum++;
    }
    return sum;
}
function NavItemClicked(e)
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
function UpdateNavbar()
{
    var scroll = document.scrollingElement.scrollTop;
    // y is a scalar [0, 1]. 0 => navbar is at top, 1 => is as low as possible
    var y = (bannerHeight-scroll)/bannerHeight;
    if (y < 0) y = 0;

    navBarEL.style.top = y*bannerHeight+"px";
    var navImgELs = document.getElementsByClassName("navImg");
    for (var i = 0; i < navImgELs.length; i++)
    {
        var imgEL = navImgELs[i];
        if (imgEL.naturalWidth == 0) return;  // avoid dividing by zero
        // imgDimensionRelation is the relation between the source image height to width
        var imgDimensionRelation = imgEL.naturalHeight/imgEL.naturalWidth;

        var minHeight = minimizedImageHeight;
        var minWidth = Math.floor(minHeight/imgDimensionRelation);
        var maxHeight = y*bannerHeight*2+navBarHeight;
        var maxWidth = Math.floor(maxHeight/imgDimensionRelation);
        var width = Math.floor(minWidth*(1-y)+maxWidth*y);
        imgEL.style.width = width+"px";
        imgEL.style.height = width*imgDimensionRelation+"px";
        imgEL.style.top = -y*bannerHeight+"px";
    }
}

// ========== INITIALIZATION ==========
ResetAll();