var slideIndex = 1;

function plusSlides(n = 1) {
    showSlides(slideIndex += n);
}

function currentSlide(n) {
    showSlides(slideIndex = n);
}

function showSlides(n) {
    var i;
    var slides = document.getElementsByClassName("slide");
    var dots = document.getElementsByClassName("dot");
    if (n > slides.length) {slideIndex = 1}
    if (n < 1) {slideIndex = slides.length}
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    for (i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active", "");
    }
    slides[slideIndex-1].style.display = "block";
    dots[slideIndex-1].className += " active";
}
showSlides(slideIndex);
var autoplay = setInterval(plusSlides, 10000);

var buttons = document.querySelectorAll(".dot, .next, .prev");

function stop_autoplay(){
    clearInterval(autoplay);
    for(let i=0; i<buttons.length; i++){
        buttons[i].removeEventListener('click', stop_autoplay);
    }
}

for(let i=0; i<buttons.length; i++){
    buttons[i].addEventListener('click', stop_autoplay);
}

var committees = document.querySelectorAll('.content svg');
var popup = document.getElementById('popup');
var popup_name = popup.getElementsByClassName('name')[0];
var popup_desc = popup.getElementsByClassName('desc')[0];

var touch = 0;
var touchX = 0;
var touchY = 0;

var outlines = document.getElementsByClassName('path');
for(let i=0; i<outlines.length; i++){
        outlines[i].addEventListener('touchstart', e => {
            touch = Date.now();
            touchX = e.touches[0].clientX;
            touchY = e.touches[0].clientY;
        }, {passive: true});

        outlines[i].addEventListener('mouseenter', e => {
            var outline = e.currentTarget;
            var id = outline.id;
            var realname = id.split(/(?=[A-Z])/).join(' ');
            var committee = outline.parentNode;
            var img = committee.getElementsByClassName('grayscaled')[0];
            img.setAttribute('mask', 'url(#' + id + '_mask)');
            img.setAttribute('style', 'filter: brightness(110%)');
            popup_name.innerText = realname;
            popup_desc.innerText = 'Facil group: ' + outline.classList.item(1);
            if(Date.now() - touch < 200){
                if(window.innerWidth - touchX > 100){
                    popup.style.left = String(touchX) + 'px';
                    popup.style.right = 'auto';
                }
                else{
                    popup.style.right = (window.innerWidth - String(touchX)) + 'px';
                    popup.style.left = 'auto';
                }
                if(window.innerHeight - touchY > 80){
                    popup.style.top = String(touchY) + 'px';
                    popup.style.bottom = 'auto';
                }
                else{
                    popup.style.bottom = (window.innerHeight - String(touchY)) + 'px';
                    popup.style.top = 'auto';
                }
            }
            popup.setAttribute('style', 'display: inline-block');
        }, {passive: true});

        outlines[i].addEventListener('mouseleave', e => {
            var outline = e.currentTarget;
            var committee = outline.parentNode;
            var img = committee.getElementsByClassName('grayscaled')[0];
            img.setAttribute('style', 'filter: brightness(100%)');
            popup.setAttribute('style', 'display: none');
        }, {passive: true});
}

for(let i=0; i<committees.length; i++){
    committees[i].addEventListener('mousemove', e => {
        var x = e.clientX;
        var y = e.clientY;
        if(window.innerWidth - x > 200){
            popup.style.left = String(x) + 'px';
            popup.style.right = 'auto';
        }
        else{
            popup.style.right = (window.innerWidth - String(x) - 20) + 'px';
            popup.style.left = 'auto';
        }
        if(window.innerHeight - y > 80){
            popup.style.top = String(y) + 'px';
            popup.style.bottom = 'auto';
        }
        else{
            popup.style.bottom = (window.innerHeight - String(y)) + 'px';
            popup.style.top = 'auto';
        }
    }, {passive: true});
}

var observer = null;

function facilAnimation(){
    if(window.innerWidth > 767){
        var option = {
            rootMargin: '0px 0px -80px 0px',
            threshold: 0.2
        }
    }
    else if(window.innerWidth > 500){
        var option = {
            rootMargin: '0px 0px -300px 0px',
            threshold: 0.2
        }
    }
    else{
        var option = {
            rootMargin: '0px 0px -250px 0px',
            threshold: 0.3
        };
    }
    var facilWrapper = document.getElementById('facil-wrapper');
    if(observer != null){
        observer.disconnect();
    }
    observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            var scientist = entry.target.id;
            var group = facilWrapper.getElementsByClassName(scientist)[0];
            var displayed = document.getElementById('displayed-facil');
            if(entry.isIntersecting){
                if(displayed != null){
                    displayed.id = '';
                }
                group.id = 'displayed-facil';
                return;
            }
            if(displayed == group){
                displayed.id = '';
            }
        });
    }, option);

    var scientists = document.querySelectorAll('#facil-wrapper .scientist');
    for(let i=0; i<scientists.length; i++){
        observer.observe(scientists[i]);
    }
}

facilAnimation();

window.addEventListener('resize', facilAnimation);