
if(document.readyState == "loading"){
  document.addEventListener("DOMContentLoaded", ready)
} else {
  ready()
}

function ready(){
  // for slide in animation
var overlay = document.getElementById("overlay");
var checkout = document.querySelector(".checkout");

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

/*var addQty = document.getElementsByClassName("qty-increase")
for(let i=0; i<addQty.length; i++){
  var increase= addQty[i]
  increase.addEventListener('click', increaseQuantityOfItem)
}

var decreaseQty = document.getElementsByClassName("qty-decrease")
for(let i=0; i<decreaseQty.length; i++){
  var decrease= decreaseQty[i]
  increase.addEventListener('click', decreaseQuantityOfItem)
}*/
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
  addItemToCart(title, price, glaze, qty, imageSrc)
}

function addItemToCart(title, price, glaze, qty, imageSrc){
  var cartRow= document.createElement("div")
  cartRow.classList.add("product")
  var cartItems = document.getElementsByClassName("cart-items")[0]
  var cartItemNames = cartItems.getElementsByClassName("cart-item-title")
  var cartItemGlaze= cartItems.getElementsByClassName("glaze")
  console.log(cartItemGlaze)
  for(let i=0; i<cartItemNames.length; i++){
    if(cartItemNames[i].innerText == title && cartItemGlaze[i].innerText == glaze){
      alert('This item is already in your cart')
      return
    }
  }
  var cartRowContents = `
            <img class= "image" src="${imageSrc}">
            <div class="details">
                <div class="name">
                <h4 class="cart-item-title">${title}</h4>
                <button class="trash">
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
updateCartTotal()
}

/*function decreaseQuantityOfItem(event){
    var buttonClicked = event.target
    var counter= buttonClicked.parentElement
    var counterValue= counter.getElementsByClassName("cart-quantity")[0].value
    counterValue = parseInt(counterValue)
    if(counterValue > 1){
      counterValue = counterValue-1
      
    } else {
      alert("Please delete the item from our cart instead!")
    }
  }
    function increaseQuantityOfItem(event){
    var buttonClicked = event.target
    var counter = buttonClicked.parentElement
    var cartQty= counter.getElementsByClassName("cart-quantity")[0]
    var counterValue= cartQty.value
    counterValue = parseInt(counterValue)
    if(counterValue)
    counterValue = counterValue*3
    cartQty.value=counterValue
    updateCartTotal()
    }*/

