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
var imgs = ['../imgs/shakeBanner.png',
            '../imgs/happyHour.png',
            '../imgs/studentDiscount.png'];

//Sets a base cooldown between each image change.
cooldown = 3000;
time = cooldown;
//Sets the first image as the first in the img list
count = 0;

//Changes the slides
function changeSlide(change) {
    time = cooldown;
    count += change;

    /*Checks if the place in the list if count is before the first element in the list.
      Then it sets the count to the last element in the list*/
    if (count < 0) {
        count = imgs.length-1;
    }
    
    /*Checks if the place in the list if count is greater than the last element in the list.
      Then it sets the count to the first element in the list*/
    else if (count >= imgs.length) {
         count = 0;
    } 

    document.getElementById('img1').src = imgs[count];
    //Stops the setTimeout function so it doesent overflow
    clearTimeout(timeoutVar);
    
}

function slideshow() {
    //Sets the count to += 1 in the changeSlide function
    changeSlide(1);
    //A function that runs slideshow() in intervals of time
    timeoutVar = setTimeout("slideshow()", time);
}

 //Clicks the left button
lButton.addEventListener("click", () => {
    //Sets the count to -= 1 in the changeSlide function
    changeSlide(-1);
    timeoutVar = setTimeout("slideshow()", time);
    
});

//Clicks the right button
RButton.addEventListener("click", () => {
    changeSlide(1);
    timeoutVar = setTimeout("slideshow()", time);
    
});
//Runs slideshow
slideshow();