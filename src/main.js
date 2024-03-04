let shop = document.getElementById("shop");

let basket = JSON.parse(localStorage.getItem("cartData")) || [];

let generateShop = () => {
  return (shop.innerHTML = shopItemsData
    .map((item) => {
      let { id, name, price, desc, img } = item;
      let searchForProducts = basket.find((item) => item.id === id) || [];
      return `    <div id=product-id-${id} class="item">
      <img width="220" src=${img} alt="">
      <div class="details">
        <h3>${name}</h3>
        <p>${desc}</p>
        <div class="price-quantity">
          <h2>$ ${price} </h2>
          <div class="buttons">
            <i onclick="decrement('${id}')" class="bi bi-dash-lg"></i>
            <div id=${id} class="quantity">${
        searchForProducts.quantity === undefined
          ? 0
          : searchForProducts.quantity
      }</div>
            <i onclick="increment('${id}')" class="bi bi-plus-lg"></i>
          </div>
        </div>
      </div>
  </div>`;
    })
    .join(""));
};

generateShop();

let increment = (id) => {
  let findProduct = basket.find((item) => item.id === id);
  if (!findProduct) {
    basket.push({
      id: id,
      quantity: 1,
    });
  } else {
    findProduct.quantity += 1;
  }
  generateShop();
  updateCartNumber();
  localStorage.setItem("cartData", JSON.stringify(basket));
};

let decrement = (id) => {
  let findProduct = basket.find((item) => item.id === id);

  if (findProduct === 0) return;
  if (!findProduct) {
    return;
  } else {
    findProduct.quantity -= 1;
  }
  basket = basket.filter((item) => item.quantity);
  generateShop();
  updateCartNumber();
  localStorage.setItem("cartData", JSON.stringify(basket));
};

let updateCartNumber = () => {
  let cartIconAmount = document.getElementById("cartAmount");

  cartIconAmount.innerHTML = basket
    .map((item) => item.quantity)
    .reduce((acc, num) => acc + num, 0);
};

console.log(basket);

updateCartNumber();
