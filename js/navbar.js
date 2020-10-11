// LAST EDITED BY:
// Torbjørn, 11.10.2020
// - Pretty much finished the navbar, I think

// ========== GLOBAL VARIABLES ==========
// Config
// NOTE: Navbar logo size is determined by bannerHeight, navBarHeight and imageCellWidthWeight.
// Tweak these numbers to adjust logo size in different situations.
var bannerHeight = 70;
var navBarHeight = 80;
var imageCellWidthWeight = 0.65;  // Cell widths get distributed among items. Image cells get this weight compared to buttons, which get 1 weight.

var bodyEL = document.querySelector("body");
var bannerEL = null;  // bannerEL is the spruce wood-part
var navBarEL = null;  // navBarEL is the orange part with all the buttons and logo
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
    CreateNavItems();
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
        var itemWidth = 1/weightSum;

        if ("displayImg" in thisItem)
        {  // Display an image instead of text
            var itemEL = document.createElement("img");
            itemWidth *= imageCellWidthWeight;
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

        itemCellEL.relWidth = itemWidth;  // Fraction of window space the cell/button should take
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
        if ("displayImg" in item)
        {
            sum += imageCellWidthWeight;
            console.log("hjup");
        }
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
    const vw = document.documentElement.clientWidth;
    // y is a scalar [0, 1]. 0 => navbar is at top, 1 => is as low as possible
    var y = (bannerHeight-scroll)/bannerHeight;
    if (y < 0) y = 0;

    navBarEL.style.top = y*bannerHeight+"px";

    // navCell handling
    var navCellELs = document.getElementsByClassName("navCell");
    for (var i = 0; i < navCellELs.length; i++)
    {
        var cellEL = navCellELs[i];
        var relWidth = cellEL.relWidth;
        var absWidth = Math.floor(relWidth*vw);  // floor because if it rounds up, the last button may go on a new line
        cellEL.style.width = absWidth+"px";

        var itemEL = cellEL.firstChild;
        if (itemEL.classList.contains("navImg"))
        {
            var navImgEL = itemEL;  // Better variable name
            // Item is a navImg. Special image rules apply

            /* RULES FOR NAVIMG APPEARANCE.
            ALL MUST BE FULFILLED
            1: The navimg center position is static relative to the navbar.
            2: The navimg width cannot be larger than its cell-width
            3: All of the navimg should be visible at all times (restriction to height)
            4: Following these rules, the navimg should be as big as possible.
            */

            var rule2Width = absWidth;


            var centerX = Math.floor(absWidth/2);
            var centerY = Math.floor(navBarHeight/2);
            var rule3Height = (centerY+y*bannerHeight)*2;  // Distance from center of image to top of page, times 2
            var rule3Width = rule3Height/GetImgHeightWidthRelation(navImgEL);

            var actualWidth = Math.min(rule2Width, rule3Width);
            console.log("chose "+actualWidth);
            var actualHeight = Math.floor(actualWidth*GetImgHeightWidthRelation(navImgEL));

            navImgEL.style.width = actualWidth+"px";
            navImgEL.style.height = actualHeight+"px";
            console.log(actualHeight+", "+navImgEL.style.height);
            navImgEL.style.top = Math.floor(centerY-actualHeight/2)+"px";
            navImgEL.style.left = Math.floor(centerX-actualWidth/2)+"px";
        }
    }
}
function GetImgHeightWidthRelation(imgEL)
{
    if (imgEL.naturalWidth == 0) return 0;  // avoid dividing by zero
    // imgDimensionRelation is the relation between the source image height to width
    var imgDimensionRelation = imgEL.naturalHeight/imgEL.naturalWidth;
    return imgDimensionRelation;
}   

// ========== INITIALIZATION ==========
ResetAll();