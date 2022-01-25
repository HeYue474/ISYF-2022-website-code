const start = 1642465800000;
const end = 1642780800000;
var d = document.getElementById("days");
var h = document.getElementById("hours");
var m = document.getElementById("mins");
var curr = document.getElementsByClassName("curr")[0];
var next = document.getElementsByClassName("next")[0];

function inittime(){
    var now = Date.now();
    time = start - now;
    time = Math.floor(time/1000);
    time = time % 86400;
    d.querySelector(".dynamic").setAttribute("style", "animation-delay: -" + (86400-time).toString() + "s");
    time = time % 3600;
    h.querySelector(".dynamic").setAttribute("style", "animation-delay: -" + (3600-time).toString() + "s");
    time = time % 60;
    m.querySelector(".dynamic").setAttribute("style", "animation-delay: -" + (60-time).toString() + "s");
    return (60-time);
}

function settime(){
    var now = Date.now();
    time = start - now;
    time = Math.floor(time/1000);
    var days = Math.floor(time / 86400);
    time = time % 86400;
    var hours = Math.floor(time / 3600);
    time = time % 3600;
    var mins = Math.floor(time / 60);
    d.querySelector(".countdown-number").textContent = days;
    h.querySelector(".countdown-number").textContent = hours;
    m.querySelector(".countdown-number").textContent = mins;
}
if(Date.now() < start){
    inittime();
    settime();
    setInterval(settime, 1000);
}
else if(Date.now() < end){
    curr.style.display ="inline-block";
    d.style.display = "none";
    h.style.display = "none";
    m.style.display = "none";
}
else{
    next.style.display ="inline-block";
    d.style.display = "none";
    h.style.display = "none";
    m.style.display = "none";
}



  
