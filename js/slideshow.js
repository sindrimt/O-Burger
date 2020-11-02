//Elements from index.html
var bodyEL = document.querySelector("body");
var contentEL = document.querySelector("article.content");

//Left button
var lButton = document.createElement("button");

//lButton.innerHTML = "LEFTBUTTON";
lButton.id = "lButton";

//lButton.addEventListener("click", lButtonf);
bodyEL.appendChild(lButton);

var timeoutVar;

//Right button
var RButton = document.createElement("button");

//RButton.innerHTML = "RIGTHBUTTON";
RButton.id = "RButton";

//RButton.addEventListener("click", RButtonf);
bodyEL.appendChild(RButton);

//Array with the img sources
var imgs = ['../imgs/shakeupd.png',
            '../imgs/hourFINAL.png',
            '../imgs/stud.png'];

cooldown = 3000;
time = cooldown;
count = 0;

function changeSlide(change) {
    time = cooldown;
    count += change;

    if (count < 0) {
        count = imgs.length-1;
    }

    else if (count >= imgs.length) {
         count = 0;
    } 

    document.getElementById('img1').src = imgs[count];

    clearTimeout(timeoutVar);
    
}

function slideshow() {
    changeSlide(1);
    
    timeoutVar = setTimeout("slideshow()", time);
}

 //Clicks the left button
lButton.addEventListener("click", () => {
    changeSlide(-1);
    timeoutVar = setTimeout("slideshow()", time);
    
});

//Clicks the right button
RButton.addEventListener("click", () => {
    changeSlide(1);
    timeoutVar = setTimeout("slideshow()", time);
    
});

slideshow();