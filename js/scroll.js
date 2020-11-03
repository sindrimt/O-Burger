// WARNING: THIS SCRIPT USES VARIABLES FROM NAVBAR.JS
// IN HTML, IMPORT NAVBAR.JS BEFORE IMPORTING THIS
// CONFIG
var scrollScalar = 0.5;  // How much images should scroll in the background


var imgELs = [];  // Stores the document objects raw
imgELs = document.querySelectorAll("img.scroll");



function GetScrollImages()
{
    scrollImages = [];
    for (var i = 0; i < imgELs.length; i++)
    {
        var newImageObj = {};
        var imgEL = imgELs[i];
        imgEL.className += " centered";  // All scroll images also get centered. Centered is its own class so that not only scroll images can be centered.
        newImageObj["el"] = imgEL;  // links to the document element
        newImageObj["initialY"] = GetPosOf(imgEL)+startScroll;  // The y-position of the element when loading the page
        scrollImages.push(newImageObj);
    }
}
function GetPosOf(EL)
{
    return EL.getBoundingClientRect().top;
}
function UpdateImgs()
{  // When scrolling, set the position of each scroll image
    var scroll = document.documentElement.scrollTop;  // Current scrollamount
    for (var i = 0; i < scrollImages.length; i++)
    {
        var image = scrollImages[i];  // image is the object containing all the information
        var imgEL = image["el"];  // imgEL is the element itself, and is included in the image object
        var initialY = image["initialY"];  // the Y value this object got assigned when the page loaded
        var y = scroll*scrollScalar-initialY+navBarHeight;
        imgEL.style.top = y+"px";
    }
}

var scrollImages;
// scrollImages will turn out something like this:
// [{"el":element, "initialScroll":0}
// {"el":anotherelement, "initialScroll":230}
// {"el":yetanotherelement, "initialScroll":345}]
// This gets auto-generated.

var startScroll = document.documentElement.scrollTop;
document.addEventListener("scroll", UpdateImgs);
window.addEventListener("resize", UpdateImgs);

GetScrollImages();
UpdateImgs();