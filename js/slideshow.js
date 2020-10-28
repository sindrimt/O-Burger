var bodyEL = document.querySelector("body");
var articleEL = document.querySelector("#slide");
//Left button
var lButton = document.createElement("button");
//lButton.innerHTML = "LEFTBUTTON";
lButton.id = "lButton";
//lButton.addEventListener("click", lButtonf);
bodyEL.appendChild(lButton);

//Right button
var RButton = document.createElement("button");
//RButton.innerHTML = "RIGTHBUTTON";
RButton.id = "RButton";
//RButton.addEventListener("click", RButtonf);
bodyEL.appendChild(RButton);

//Array with the img sources
var imgs = ['../imgs/OShake.jpg',
            '../imgs/visepresident.jpg',
            '../imgs/littkult.jpg'];

time = 3000;
count = 0;

function slideshow() {
  
    if (count == imgs.length) { 
            count = 0;
     }
    document.getElementById('img1').src = imgs[count];
    count++;
    
    setTimeout("slideshow()", time);
}
 //Clicks the left button
lButton.addEventListener("click", () => {

    count--;
    console.log("left");
    time = time;
    
    if (count < 0) { 
        count = imgs.length-1;
 }
    document.getElementById('img1').src = imgs[count];
});

//Clicks the right button
RButton.addEventListener("click", () => {

    count++;
    console.log("right");
    time = time;
    
    if (count > imgs.length-1) { 
        count = 0;
    }
    document.getElementById('img1').src = imgs[count];
});

/*setInterval(function(){ 
    document.getElementById('img1').src = imgs[count]; 
}, 10);*/

slideshow();