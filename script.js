
if(document.readyState == "loading"){
  document.addEventListener("DOMContentLoaded", ready)
} else {
  ready()
}

function ready(){
  // for slide in animation
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


// for shopping cart functionality
var removeCartItemButtons = document.getElementsByClassName("trash")
for (let i=0; i<removeCartItemButtons.length; i++){
  var button = removeCartItemButtons[i]
  button.addEventListener('click', removeCartItem)
}

var addToCartButtons = document.getElementsByClassName("add-to-cart")
for(let i=0; i<addToCartButtons.length; i++){
    var button = addToCartButtons[i]
    button.addEventListener('click', addToCartClick)
}
}

function removeCartItem(event){
  var buttonClicked = event.target
    buttonClicked.parentElement.parentElement.parentElement.parentElement.remove()
    updateCartTotal()
}
function updateCartTotal(){
  var cartItemContainer = document.getElementsByClassName("cart-items")[0]
  var cartRows = cartItemContainer.getElementsByClassName("product")
  var total=0
  for (let i=0; i< cartRows.length; i++){
      var cartRow= cartRows[i]
      var priceElement= cartRow.getElementsByClassName("cart-price")[0]
      var quantityElement= cartRow.getElementsByClassName("cart-quantity")[0]
      var price = parseFloat(priceElement.innerText.replace("$", ''))
      var quantity = quantityElement.value
      total = total + (price * quantity)
  }
  var billTotal = total + 15
  document.getElementsByClassName("cart-total")[0].innerText = "$" + total
  document.getElementsByClassName("bill-total")[0].innerText = "$" + billTotal
}

function addToCartClick(event){
  var button = event.target
  var shopItem = button.parentElement.parentElement
  var itemImage= button.parentElement.parentElement.parentElement
  var title = shopItem.getElementsByClassName("roll-title")[0].innerText
  var price= shopItem.getElementsByClassName("roll-price")[0].innerText
  var glaze = shopItem.getElementsByClassName("glaze")[0].value
  var qty = shopItem.getElementsByClassName("qty")[0].value
  var imageSrc= itemImage.getElementsByClassName("banner-pd")[0].src
  addItemToCart(title, price, glaze, qty, imageSrc)
}

function addItemToCart(title, price, glaze, qty, imageSrc){
  var cartRow= document.createElement("div")
  cartRow.classList.add("product")
  var cartItems = document.getElementsByClassName("cart-items")[0]
  var cartItemNames = cartItems.getElementsByClassName("cart-item-title")
  for(let i=0; i<cartItemNames.length; i++){
    if(cartItemNames[i].innerText == title){
      alert('This item is already in your cart')
      return
    }
  }
  var cartRowContents = `
  <img class= "image" src="${imageSrc}" alt="original cinnamon roll">
  <div class="details">
      <div class="name">
      <h4 class="cart-item-title">${title}</h4>
      <button class="trash">
      <img style="height:18px; width: 18px;" src="./icons/trash 1.png">
      </button>
      </div>
      <p class="cart-price">${price}</p>
      <div class="quant">
          <button class="qty-decrease">-</button>
          <input class="cart-quantity" type="number" value="${qty}">
          <button class="qty-increase">+</button>
      </div>
</div>`
cartRow.innerHTML = cartRowContents
cartItems.append(cartRow)
cartRow.getElementsByClassName("trash")[0].addEventListener('click', removeCartItem)
updateCartTotal()
}

