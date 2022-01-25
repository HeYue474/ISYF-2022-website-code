var lazyloadImages;    
  
if ("IntersectionObserver" in window){

  lazyloadImages = document.querySelectorAll(".lazy");
  lazyloadBigImages = document.querySelectorAll(".lazy-big");

  var imageObserver = new IntersectionObserver(function(entries, observer){
    entries.forEach(function(entry) {
      if (entry.isIntersecting) {
        var image = entry.target;
        image.src = image.dataset.src;
        image.classList.remove("lazy");
        imageObserver.unobserve(image);
      }
    });
  });

  var bigImageObserver = new IntersectionObserver(function(entries, observer){
    entries.forEach(function(entry) {
      if (entry.isIntersecting){
        var image = entry.target;
        if(!image.hasAttribute('src')){
          image.src = image.dataset.src;
          image.classList.remove("lazy-big");
          imageObserver.unobserve(image);
        }
        var big = image.parentElement.parentElement;
        var prev = big.previousElementSibling;
        var next = big.nextElementSibling;
        if(prev && prev.classList.contains('big')){
          image = prev.querySelector('img');
          if(image.classList.contains('lazy-big')){
            image.src = image.dataset.src;
            image.classList.remove("lazy-big");
          }
        }
        if(next && next.classList.contains('big')){
          image = next.querySelector('img');
          if(image.classList.contains('lazy-big')){
            image.src = image.dataset.src;
            image.classList.remove("lazy-big");
          }
        }
      }
    });
  });

  lazyloadImages.forEach(function(image) {
    imageObserver.observe(image);
  });
  lazyloadBigImages.forEach(function(image){
    bigImageObserver.observe(image);
  });
}

var videos = document.getElementsByClassName("youtube-video")
for (let i = 0; i < videos.length; i++){
  videos[i].addEventListener('click', function(){
    var x = document.createElement("iframe"),
    e = "true" == this.dataset.ssv ? "1" : "0",
    s = "true" == this.dataset.spc ? "1" : "0",
    i = "true" == this.dataset.sta ? "1" : "0",
    a = "true" == this.dataset.dkc ? "1" : "0",
    r = "true" == this.dataset.ecc ? "1" : "0",
    o = "true" == this.dataset.eap ? "1" : "0";
    x.setAttribute("src", "//www.youtube.com/embed/" + this.dataset.id + "?rel=" + e + "&controls=" + s + "&showinfo=" + i + "&disablekb=" + a + "&cc_load_policy=" + r + "&autoplay=" + o);
    x.setAttribute("class", "youtube-iframe");
    if(this.dataset.afs) x.setAttribute("allowfullscreen", "");
    for (;this.firstChild;){
      this.removeChild(this.firstChild);
    }
    this.appendChild(x);
  });
}

var photos = document.querySelectorAll('.content > div > img');
var darkBackground = document.getElementById('dark-background');
var closeBtn = document.getElementsByClassName('close')[0];
var prevBtn = document.getElementsByClassName('prev')[0];
var nextBtn = document.getElementsByClassName('next')[0];

for(let i=0; i<photos.length; i++){
  photos[i].addEventListener('click', e => {
    document.getElementsByClassName(e.currentTarget.dataset.cls)[0].classList.add('display');
    darkBackground.style.display = 'inline-block';
  }, {passive: true});
}


darkBackground.addEventListener('click', e => {
  if(e.target != e.currentTarget && e.target != closeBtn) return;
  document.getElementsByClassName('display')[0].classList.remove('display');
  darkBackground.style.display = 'none';
  darkBackground.scrollTo(0, 0);
});

prevBtn.addEventListener('click', e => {
  e.stopPropagation();
  var displayed = document.getElementsByClassName('display')[0];
  var next_display = displayed.previousElementSibling;
  if(next_display && next_display.classList.contains('big')){
    displayed.classList.remove('display');
    next_display.classList.add('display');
  }
}, {passive: true});

nextBtn.addEventListener('click', e => {
  e.stopPropagation();
  var displayed = document.getElementsByClassName('display')[0];
  var next_display = displayed.nextElementSibling;
  if(next_display && next_display.classList.contains('big')){
    displayed.classList.remove('display');
    next_display.classList.add('display');
  }
}, {passive: true});