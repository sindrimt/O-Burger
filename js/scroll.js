// WARNING: THIS SCRIPT USES VARIABLES FROM NAVBAR.JS
// IN HTML, IMPORT NAVBAR.JS BEFORE IMPORTING THIS
// CONFIG
var scrollScalar = 0.5;  // How much images should scroll in the background


var imgELs = [];  // Stores the document objects raw
imgELs = document.querySelectorAll("img.scroll");



function GetPosOf(EL)
{
    return EL.getBoundingClientRect().top;
}
function UpdateImgs()
{
    var scroll = document.documentElement.scrollTop;
    for (var i = 0; i < scrollImages.length; i++)
    {
        var image = scrollImages[i];  // image is the object containing all the information
        var imgEL = image["el"];
        var initialY = image["initialY"];
        var y = scroll*scrollScalar-initialY+navBarHeight;
        imgEL.style.top = y+"px";
    }
}

var scrollImages = [];
// scrollImages will turn out something like this:
// [{"el":element, "initialScroll":0}
// {"el":anotherelement, "initialScroll":230}
// {"el":yetanotherelement, "initialScroll":345}]

var startScroll = document.documentElement.scrollTop;
document.addEventListener("scroll", UpdateImgs);
window.addEventListener("resize", UpdateImgs);
for (var i = 0; i < imgELs.length; i++)
{
    var newImageObj = {};
    var imgEL = imgELs[i];
    newImageObj["el"] = imgEL;  // links to the document element
    newImageObj["initialY"] = GetPosOf(imgEL)+startScroll;  // The y-position of the element when loading the page
    scrollImages.push(newImageObj);
}
UpdateImgs();