
if(document.readyState == "loading"){
  document.addEventListener("DOMContentLoaded", ready)
} else {
  ready()
}

function ready(){
  // for slide in animation
var overlay = document.getElementById("overlay");
var checkout = document.querySelector(".checkout");

updateCart()

document.querySelector(".navigation .cart-button").addEventListener("click", function(event){
  console.log('hi')
  event.preventDefault()
  openCheckOut()
})

var addToCart= document.querySelector(".add-to-cart")
if (addToCart){
  addToCart.addEventListener('click', function(){
    overlay.style.display="block";
    checkout.classList.add("slide-in");
  })
}

document.querySelector("#overlay-close").addEventListener("click", function(){
  overlay.style.display="none";
  checkout.classList.remove("slide-in");
})

function openCheckOut(){
  overlay.style.display="block";
  checkout.classList.add("slide-in");
}

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
  var title = event.currentTarget.dataset.title
  var glaze = event.currentTarget.dataset.glaze
    updateCartTotal()
    removeItemFromLocalStorage(title, glaze)
}
function updateCartTotal(){
  var cartItemContainer = document.getElementsByClassName("cart-items")[0]
  var cartRows = cartItemContainer.getElementsByClassName("product")
  var total=0
  var totalamount=0
  for (let i=0; i< cartRows.length; i++){
      var cartRow= cartRows[i]
      var priceElement= cartRow.getElementsByClassName("cart-price")[0]
      var quantityElement= cartRow.getElementsByClassName("cart-amount")[0]
      var price = parseFloat(priceElement.innerText.replace("$", ''))
      var quantity = parseFloat(quantityElement.innerText)
      total = total + (price * quantity)
      totalamount= totalamount + quantity
  }
  var billTotal = total + 5
  document.getElementsByClassName("cart-total")[0].innerText = "$" + total
  document.getElementsByClassName("bill-total")[0].innerText = "$" + billTotal
  document.getElementsByClassName("cart-heading")[0].innerText= "cart(" + totalamount +")"
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
  updateLocalStorage(title, price, glaze, qty, imageSrc)
}

function addItemToCart(title, price, glaze, qty, imageSrc){
  var cartRow= document.createElement("div")
  cartRow.classList.add("product")
  var cartItems = document.getElementsByClassName("cart-items")[0]
  var cartItemNames = cartItems.getElementsByClassName("cart-item-title")
  var cartItemGlaze= cartItems.getElementsByClassName("glaze")
  console.log(cartItemGlaze)
  var cartRowContents = `
            <img class= "image" src="${imageSrc}">
            <div class="details">
                <div class="name">
                <h4 class="cart-item-title">${title}</h4>
                <button class="trash" data-title="${title}" data-glaze="${glaze}">
                <img style="height:18px; width: 18px;" src="./icons/trash 1.png">
                </button>
                </div>
                <p class="cart-price">${price}</p>
                <p style="font-size:15px; color:black;" class="glaze">${glaze}</p>
                <p style="font-size:15px; color:black;" class="cart-amount">${qty}</p>
            </div>`
cartRow.innerHTML = cartRowContents
cartItems.append(cartRow)
cartRow.getElementsByClassName("trash")[0].addEventListener('click', removeCartItem)

}

function updateLocalStorage(title, price, glaze, qty, imageSrc) {
  var cartItems = document.getElementsByClassName("cart-items")[0]
  cartItems.innerHTML = ""
  var cartItemsData = JSON.parse(localStorage.getItem("cart")) || []
  var similarItem = cartItemsData.filter(item => {
    return item.title === title && item.glaze === glaze
  })
  console.log(similarItem)
  if(similarItem.length>0)
  {
    alert("This item is already in your cart!")
  } else {
    cartItemsData.push({
      title, price, glaze, qty, imageSrc})
  }
  cartItemsData.map(item => {
    addItemToCart(item.title, item.price, item.glaze, item.qty, item.imageSrc)
  })
  localStorage.setItem("cart", JSON.stringify(cartItemsData))
  updateCartTotal()
}

function updateCart(){
  var cartItems = document.getElementsByClassName("cart-items")[0]
  cartItems.innerHTML = ""
  var cartItemsData = JSON.parse(localStorage.getItem("cart")) || []
    cartItemsData.map(item => {
      addItemToCart(item.title, item.price, item.glaze, item.qty, item.imageSrc)
    })
  updateCartTotal()
}

function removeItemFromLocalStorage(title, glaze){
  var cartItems = document.getElementsByClassName("cart-items")[0]
  cartItems.innerHTML = ""
  var cartItemsData = JSON.parse(localStorage.getItem("cart")) || []
  var newList = cartItemsData.filter(item => {
    return item.title != title || item.glaze != glaze
  })
  localStorage.setItem("cart", JSON.stringify(newList))
  updateCart()
}