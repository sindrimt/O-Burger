function CreateWrapperFor(element, href, newPage = false)
{  // Lets an input element have a link to send the user to
    // Does this by creating a wrapper element of type "a".
    // The wrapper element is then appended to the footer.
    var wrapperEL = document.createElement("a");
    wrapperEL.href = href;
    if (newPage) wrapperEL.target = "_blank";
    wrapperEL.appendChild(element);
    footerEL.appendChild(wrapperEL);
}

var bodyEL = document.body;
var footerEL = document.createElement("div");
footerEL.id = "footer";

var logoEL = document.createElement("img");
logoEL.src = "../imgs/global/OBurger-logo.png";
logoEL.alt = "Logo";
logoEL.id = "footerLogo";
CreateWrapperFor(logoEL, "#banner", false);

var backgroundEL = document.createElement("img");
backgroundEL.src = "../imgs/global/sprucewood.jpg";
backgroundEL.alt = "Background";
backgroundEL.id = "footerBackground";
backgroundEL.className = "centered";  // centers the background so it looks cooler and epicer and gooder when zooming or resizing window
footerEL.appendChild(backgroundEL);

var facebookEL = document.createElement("img");
facebookEL.src = "../imgs/global/facebook.png";
facebookEL.alt = "Facebook";
facebookEL.id = "facebook";
CreateWrapperFor(facebookEL, "https://wwww.facebook.com/barackobama", true);

var instagramEL = document.createElement("img");
instagramEL.src = "../imgs/global/instagram.png";
instagramEL.alt = "Instagram";
instagramEL.id = "instagram";
CreateWrapperFor(instagramEL, "https://www.instagram.com/barackobama/?hl=en", true);

bodyEL.appendChild(footerEL);