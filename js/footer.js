bodyEL = document.querySelector("body");

footerDiv = document.querySelector("#footer");
footerDiv.innerHTML = "DETTE ER EN FOOTER";

var img = document.createElement("img"); 
 
img.src = "imgs/OBurger-logo3.png"; 

function footerDivCss() {

    //Styles footerDiv

    footerDiv.style.backgroundImage = "url('https://img.freepik.com/free-photo/old-grunge-dark-textured-wooden-background-surface-old-brown-wood-texture_7182-333.jpg?size=626&ext=jpg')";
    footerDiv.style.positon = "fixed";
    footerDiv.style.width = 100+"%"; //Does not work
    footerDiv.style.height = 200+"px";
    footerDiv.style.positon = "fixed";
    footerDiv.style.left = 0;;//Does not work
    footerDiv.style.bottom = 0;//Does not work
    footerDiv.style.backgroundColor = "red";
    footerDiv.style.color = "orange";
    footerDiv.style.textAlign = "center";
    footerDiv.style.fontSize = 30+"px";

}

function imgCss() {

    img.style.position = "absolute";
    img.style.left = 43+"%";
    img.style.width = 200+"px";

}


footerDivCss();
imgCss();
footerDiv.appendChild(img);
bodyEL.appendChild(footerDiv);
