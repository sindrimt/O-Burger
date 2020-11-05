// LAST EDITED BY:
// Torbjørn, 11.10.2020
// - Pretty much finished the navbar, I think

// ========== GLOBAL VARIABLES ==========
// Config
// NOTE: Navbar logo size is determined by bannerHeight, navBarHeight and imageCellWidthWeight.
// Tweak these numbers to adjust logo size in different situations.
var bannerHeight = 70;
var navBarHeight = 80;
var imageCellWidthWeight = 1;  // Cell widths get distributed among items. Image cells get this weight compared to buttons, which get 1 weight.
var showMenuAtSize = 1100;  // If device width in pixels is below this, show menu
var showMenu = null;  // Stores if navbar shows menu or just items right out
var menuText = "MENU";

var bodyEL = document.querySelector("body");
var bannerEL = null;  // bannerEL is the wrapper of bannerBGEL
var bannerBGEL = null;  // bannerBGEL is the spruce wood-part
var navBarEL = null;  // navBarEL is the orange part with all the buttons and logo
var menuItemsEL = null;
var navItems =
[  // Template to use when creating navButtons
    {"display":"Home", "link":"index.html", "displayImg":"../imgs/global/OBurger-logo-cropped.png"},
    {"display":"Order", "link":"order.html"},
    {"display":"Restaurants", "link":"find_restaurant.html"},
    {"display":"O'bout", "link":"about.html"},
    {"display":"Contact", "link":"contact.html"}
];

// ========== FUNCTIONS ==========

function ResetAll()
{

    bannerEL = GetBanner();
    navBarEL = CreateNavBar();
    CreateBannerBackground();
    navBarEL.innerHTML = "";
    CreateItems(false);  // Create items where isMenu = false, which means start the page using navbar.
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
    var tempEL = document.createElement("div");
    tempEL.id = "navBar";
    GetBanner().appendChild(tempEL);
    return tempEL;
}
function CreateBannerBackground()
{
    if (bannerEL == null) return;
    if (bannerBGEL != null)
    {
        bannerEL.removeChild(bannerBGEL);
    }
    bannerBGEL = document.createElement("img");
    bannerBGEL.className = "centered";
    bannerBGEL.src = "../imgs/global/sprucewood.jpg";
    bannerEL.appendChild(bannerBGEL);
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
function CreateMenu()
{  // Creates a dropdown-menu which can be clicked to reveal the pages.
    navBarEL.innerHTML = "";

    var itemCellEL = document.createElement("span");
    itemCellEL.className = "navCell";
    itemCellEL.relWidth = 1;  // Take up the entire navbar
    var dropdownEL = document.createElement("button");
    dropdownEL.innerText = menuText;
    dropdownEL.className = "navButton";
    dropdownEL.style.height = navBarEL.style.height;
    dropdownEL.addEventListener("click", ShowMenuItems);

    itemCellEL.appendChild(dropdownEL);
    navBarEL.appendChild(itemCellEL);
}
function ShowMenuItems(e)
{
    var dropdownEL = e.target;

    CreateItems(true);  // Create items, but specified isMenu = true

    navBarEL.appendChild(menuItemsEL);

    dropdownEL.removeEventListener("click", ShowMenuItems);
    dropdownEL.addEventListener("click", HideMenuItems);

}
function HideMenuItems(e)
{
    var dropdownEL = e.target;
    menuItemsEL.parentNode.removeChild(menuItemsEL);  // Remove menuItemsEL from the document.
    menuItemsEL = null;  // Remove the element from the script, since it shouldn't be accessible anymore
    dropdownEL.removeEventListener("click", HideMenuItems);
    dropdownEL.addEventListener("click", ShowMenuItems);
}
function CreateItems(isMenu = false)
{  // Combined function for creating items in both navbar and menu. Takes in argument bool isMenu.
    if (isMenu)
    {
        menuItemsEL = document.createElement("div");
        menuItemsEL.className = "menu";
    }
    else
    {
        navBarEL.innerHTML = "";  // Resets in case it already exists
        var weightSum = GetNavItemWeightSum();
        // weightSum is only important if the items are NOT in a menu.
    }
    for (var i = 0; i < navItems.length; i++)
    {  // i: navItem-index
        var itemCellEL = document.createElement("span");
        itemCellEL.className = "navCell";
        if (isMenu) itemCellEL.className += " menuCell";
        // Menu cells have both navCell and menuCell classes!
        // The menuCell class works as an override for navCell,
        // rather than needing its own, separate style in global.css.
        var thisItem = navItems[i];
        var thisDisplay = thisItem["display"];
        var thisLink = thisItem["link"];
        if (!isMenu) var itemWidth = 1/weightSum;

        if (!isMenu && "displayImg" in thisItem)
        {  // This object is configured to show logo instead of text.
            // If it's a menu, the logo is never shown regardless.
            var itemEL = document.createElement("img");
            itemWidth *= imageCellWidthWeight;
            itemEL.className = "navImg";
            // Images need to be loaded in order to get their width and height.
            // Knowing their width and height is necessary for the page to look alright.
            itemEL.addEventListener("load", UpdateNavbar);
            itemEL.src = thisItem["displayImg"];
            itemEL.alt = thisDisplay;
            itemEL.style.height = navBarEL.style.height;
            
        } else
        {  // Display text as usual.
            var itemEL = document.createElement("button");
            itemEL.className = "navButton";
            if (isMenu) itemEL.className += " menuButton";
            // Menu buttons have both navButton and menuButton classes!
            // The menuButton class works as an override for navButton,
            // rather than needing its own, separate style in global.css.
            itemEL.innerText = thisDisplay.toUpperCase();
            itemEL.style.height = navBarEL.style.height;
        }

        if (!isMenu) itemCellEL.relWidth = itemWidth;  // Fraction of window space the cell/button should take
        itemEL.link = thisLink;
        itemEL.addEventListener("click", NavItemClicked);

        itemCellEL.appendChild(itemEL);
        if (isMenu) menuItemsEL.appendChild(itemCellEL);
        else navBarEL.appendChild(itemCellEL);
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
    if (!bannerEL.className.includes("centered"))
    {
        bannerEL.className += " centered";
    }
}
function UpdateNavbar()
{
    var scroll = document.scrollingElement.scrollTop;
    const vw = document.documentElement.clientWidth;

    // The following code creates a menu if supposed to,
    // or fills in nav items if not.
    // Only creates nav items or menu if the mode changed, to improve performance.
    if (showMenu != false && vw > showMenuAtSize)
    {  // if menu was previously shown, but now shouldn't
        showMenu = false;
        
        CreateItems(false);  // Creates items, isMenu = false since navbar should have the items
    }
    else if (showMenu != true && vw < showMenuAtSize)
    {  // if menu wasn't previously shown, but now should
        showMenu = true;
        CreateMenu();
    }




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
        var absWidth = Math.floor(relWidth*vw)-1;  // floor because if it rounds up, the last button may go on a new line
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
            var actualHeight = Math.floor(actualWidth*GetImgHeightWidthRelation(navImgEL));

            navImgEL.style.width = actualWidth+"px";
            navImgEL.style.height = actualHeight+"px";
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