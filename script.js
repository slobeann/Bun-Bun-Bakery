var overlay = document.getElementById("overlay");
var checkout = document.querySelector(".checkout");

document.querySelector(".add-to-cart").addEventListener("click", function(){
  overlay.style.display="block";
  checkout.classList.add("slide-in");
})

document.querySelector("#overlay-close").addEventListener("click", function(){
  overlay.style.display="none";
  checkout.classList.remove("slide-in");
})

