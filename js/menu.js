var bodyEL = document.querySelector("body");
var menuEL = document.getElementById("menu");
function AddLogo()
{
    var logoEL = document.createElement("img");
    logoEL.src = "OBurger-logo.png";
    logoEL.alt = "O-Burger Logo";
    logoEL.style.position = "absolute";  // Relativt til navigation bar
    
    menuEL.appendChild(logoEL);
}
function AddButtonToMenu(displayName, link) 
{  // Legger til en knapp. Teksten er displayName og knappen leder til href
    var buttonEL = document.createElement("button");
    buttonEL.innerText = displayName;
    buttonEL.className = "menuButton";
    buttonEL.link = link;
    // link er ikke nødvendigvis en nettside.
    // Dersom vi ønsker å ha alt på en nettside,
    // kan vi gjøre at link er id til diven på nettsida.
    buttonEL.addEventListener("click", MenuButtonClicked)
    menuEL.appendChild(buttonEL);
}
function MenuButtonClicked(e)
{  // Sender brukeren til hvor meny-knappen spesifiserer
    // Foreløpig sendes bruker til en nettside.
    var link = e.target.link;
    //window.location.replace(link);  // hvis "forrige side"-knappen skal ta brukeren helt ut av O-Burger
    window.location.href = link;  // hvis "forrige side"-knappen skal ta brukeren til forrige O-Burger side
}
function AddMenuCss()
{
    AddCss("../css/menu.css");
}
function AddCss(path)
{
    if (!document.getElementById(path))
    {  // Hvis denne CSSen ikke finnes allerede
        var head  = document.getElementsByTagName("head")[0];
        var link  = document.createElement("link");
        link.id   = path;
        link.rel  = "stylesheet";
        link.type = "text/css";
        link.media = "all";
        link.href = path;
        head.appendChild(link);
    } else
    {
        console.error("ERROR, CSS was added twice");
    }
}

//AddMenuCss();  trengs ikke akkurat nå, meny-css er i common_style.css
// Legger til diverse knapper
AddLogo();
AddButtonToMenu("Home", "index.html");
AddButtonToMenu("Order", "order.html");
AddButtonToMenu("Maps", "find_restaurant.html");