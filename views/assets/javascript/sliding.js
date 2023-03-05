const slp = document.getElementById("slidingPic");

var images = [
    "slide1.avif",
    "slide2.avif",
    "slide3.avif",
    "slide4.avif",
    "slide5.avif",
    "slide6.avif",
  ],
  index = 0, // starting index
  maxImages = images.length - 1;

var timer = setInterval(function () {
  var curImage = images[index];
  index = index == maxImages ? 0 : ++index;

  // set your image using the curImageVar
  slp.src = "./assets/Resouces/" + images[index];
}, 2000);
