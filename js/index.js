//var listEL = document.querySelector("ul");
//listEL.style.backgroundColor = "aliceblue";

var bodyEL = document.querySelector("body");
var backgroundImgELs = document.getElementsByClassName("backgroundImg");
document.addEventListener("scroll", Scroll)

function Scroll()
{
    var scroll = (0-bodyEL.scrollTop)/8;
    for (var i = 0; i < backgroundImgELs.length; i++)
    {
        var img = backgroundImgELs[i];
        img.style.marginTop = scroll;
    }
}