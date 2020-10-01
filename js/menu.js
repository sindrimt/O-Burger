var bodyEL = document.querySelector("body");
var headerEL = document.querySelector("header");
var menuEL = document.createElement("div");
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

AddMenuCss();
// Legger til diverse knapper
AddButtonToMenu("Home", "index.html");
AddButtonToMenu("Order", "order.html");
AddButtonToMenu("Maps", "find_restaurant.html");


headerEL.append(menuEL);
//bodyEL.appendChild(headerEL);  Ubrukt siden header lages i html