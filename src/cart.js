let label = document.getElementById("label");
let shoppingCart = document.getElementById("shopping-cart");

let basket = JSON.parse(localStorage.getItem("cartData")) || [];

let cartIconNumber = () => {
  let cartIcon = document.getElementById("cartAmount");

  cartIcon.innerHTML = basket
    .map((item) => item.quantity)
    .reduce((acc, num) => acc + num, 0);
};

cartIconNumber();

let generateCartProducts = () => {
  if (basket.length) {
    return (shoppingCart.innerHTML = basket
      .map((item) => {
        let { id, quantity } = item;
        let findProductCart = shopItemsData.find(
          (dataItem) => dataItem.id === id
        );
        let { img, name, price } = findProductCart;
        return `<div class="cart-item">
            <img width="100" src=${img} alt="" />
    
            <div class="details">
            
              <div class="title-price-x">
                <h4 class="title-price">
                  <p>${name}</p>
                  <p class="cart-item-price">$ ${price}</p>
                </h4>
                <i onclick="removeEachItem('${id}')" class="bi bi-x-lg"></i>
              </div>
    
              <div class="cart-buttons">
                <div class="buttons">
                  <i onclick="decrement('${id}')" class="bi bi-dash-lg"></i>
                  <div id=${id} class="quantity">${quantity}</div>
                  <i onclick="increment('${id}')" class="bi bi-plus-lg"></i>
                </div>
              </div>
    
              <h3>$ ${quantity * price}</h3>
            
            </div>
          </div>`;
      })
      .join(""));
  } else {
    shoppingCart.innerHTML = ``;
    label.innerHTML = `
    <h2>Cart is Empty</h2>
    <a href="index.html">
      <button class="HomeBtn">Back to Home</button>
    </a>  
    `;
  }
};

generateCartProducts();

let increment = (id) => {
  let findItem = basket.find((item) => item.id === id);

  if (findItem) {
    findItem.quantity += 1;
  }

  generateCartProducts();
  totalAmount();
  cartIconNumber();
  localStorage.setItem("cartData", JSON.stringify(basket));
};

let decrement = (id) => {
  let findItem = basket.find((item) => item.id === id);

  if (findItem.quantity === 0) {
    return;
  } else {
    findItem.quantity -= 1;
  }

  basket = basket.filter((item) => item.quantity !== 0);
  generateCartProducts();
  totalAmount();
  cartIconNumber();
  localStorage.setItem("cartData", JSON.stringify(basket));
};

let removeEachItem = (id) => {
  basket = basket.filter((item) => item.id !== id);
  generateCartProducts();
  totalAmount();
  cartIconNumber();
  localStorage.setItem("cartData", JSON.stringify(basket));
};

let clearCart = () => {
  basket = [];
  generateCartProducts();
  cartIconNumber();
  localStorage.setItem("cartData", JSON.stringify(basket));
};

let totalAmount = () => {
  if (basket.length) {
    let amount = basket
      .map((item) => {
        let { id, quantity } = item;
        let productData = shopItemsData.find((item) => item.id === id);
        return productData.price * quantity;
      })
      .reduce((acc, num) => acc + num, 0);
    return (label.innerHTML = `
    <h2>Total Bill : $ ${amount}</h2>
    <a href="index.html">
    <button class="checkout">Checkout</button>
    </a>
    <button onclick="clearCart()" class="removeAll">Clear Cart</button>
    `);
  } else return;
};

totalAmount();
