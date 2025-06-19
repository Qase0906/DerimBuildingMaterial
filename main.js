const navbar = document.querySelector(".nav-bar");
const bars = document.querySelector(".bars");
const cart = document.querySelector(".cart");
const cartPopup = document.querySelector(".cart-popup");
const cancelCartPopup = cartPopup.querySelector(".times");
const productContainer = document.querySelector(".product-container");
const itemsContainer = cartPopup.querySelector(".items-container");
const countInCart = cart.querySelector("#cart-count");
const price = document.querySelector(".total-price h3");

// Load Cart from LocalStorage

window.addEventListener("DOMContentLoaded", loadToCart);

function loadToCart() {
  const getdata = JSON.parse(localStorage.getItem("items"));
  if (!getdata) return;
  const emptyCart = itemsContainer.querySelector(".empty-cart");
  emptyCart.remove(); // if something is added to cart "Your cart is empty" text is removed.

  getdata.forEach((product) => {
    const itemsBox = document.createElement("div");
    itemsBox.className = "items-box";

    itemsBox.innerHTML = `
                        <div class="img-title">
                            <div class="pro-img">
                                <img src=${product.image} alt="Wire">
                            </div>
                            <div class="pro-title">
                                <h3>${product.name}</h3>
                                <p>${product.category}</p>
                            </div> 
                        </div>

                        <p id="price">${product.price}</p>
                        
                        <div class="num-items">
                            <span>-</span>
                            <span>0</span>
                            <span>+</span>
                        </div>
                        <div class="delete">
                            <span><i class="fa-solid fa-trash"></i></span>
                        </div>
                `;

    itemsContainer.appendChild(itemsBox);
    // console.log(itemsContainer);

    price.textContent = totalAmount += product.price; // this line gives totalPrice of the product
    countInCart.textContent = count++; // Total items you added to the Cart
  });
}

// Responsive NavBar
bars.addEventListener("click", (e) => {
  navbar.classList.toggle("active");
});

// Display Cart PopUP
cart.addEventListener("click", () => {
  cartPopup.classList.toggle("active-popup");
});

window.addEventListener('click', (e)=> {
  if(!cart.contains(e.target) && !cartPopup.contains(e.target)){
    cartPopup.classList.remove('active-popup');
  }
  
})

// JSON FETCH API
async function fetchData() {
  try {
    const response = await fetch(
      "https://raw.githubusercontent.com/Qase0906/DerimBuildingMaterial/main/products.json"
    );

    const data = await response.json();

    // console.log(data[0])
    displayProduct(data);
    // loadToCart(data)
  } catch (error) {}
}

fetchData();

// Display Product on DOM
function displayProduct(products) {
  const productBoxes = [];

  products.forEach((product) => {
    const productBox = document.createElement("div");
    productBox.className = "product-box";
    productBox.innerHTML = `
                    <img src=${product.image} alt="">
                    <div class="product-content">
                        <p>${product.name}</p>
                        <span><h2>BR${product.price}</h2></span>
                        <span>Min. order: 1 unit</span>
                        <div class="btn" >
                            <button class="add-to-cart">Add to Cart</button>
                        </div>
                    </div>
                `;
    productContainer.appendChild(productBox);
    productBoxes.push(productBox);
  });
  addToCart(products, productBoxes);
}

// Add to cart
let count = 1;
let totalAmount = 0;

function addToCart(products, productBoxes) {
  products.forEach((product, index) => {
    const productBox = productBoxes[index];
    const addCart = productBox.querySelector(".add-to-cart");
    const emptyCart = itemsContainer.querySelector(".empty-cart");

    addCart.addEventListener("click", () => {
      const itemsBox = document.createElement("div");
      itemsBox.className = "items-box";
      itemsBox.setAttribute("data-id", product.id);

      // Checks if the product in cart
      const getData = JSON.parse(localStorage.getItem("items"));
      const existingItemInCart = itemsContainer.querySelector(
        `[data-id="${product.id}"]`
      );
      for (const key in getData) {
        if (getData[key].id === product.id) {
          alert("Item already in cart!"); 
          return;
        } else if (existingItemInCart) {
          alert("Item already in cart!");
          return;
        }
      }

      if (emptyCart) {
        emptyCart.remove(); // if something is added to cart "Your cart is empty" text is removed.
      }

      itemsBox.innerHTML = `
                          <div class="img-title">
                              <div class="pro-img">
                                  <img src=${product.image} alt="Wire">
                              </div>
                              <div class="pro-title">
                                  <h3>${product.name}</h3>
                                  <p>${product.category}</p>
                              </div> 
                          </div>

                          <p id="price">${product.price}</p>
                          
                          <div class="num-items">
                              <span>-</span>
                              <span>0</span>
                              <span>+</span>
                          </div>
                          <div class="delete">
                              <span><i class="fa-solid fa-trash"></i></span>
                          </div>
                  `;

      itemsContainer.appendChild(itemsBox);

      // Total Price
      price.textContent = totalAmount += product.price;

      //   Count Items in Cart
      countInCart.textContent = count++;

      const items = {
        id: product.id,
        name: product.name,
        image: product.image,
        price: product.price,
        category: product.category,
      };

      setItemstoLocalStorage(items);
      // console.log(itemsBox)
    });
  });
}

// set To localStorage
function setItemstoLocalStorage(item) {
  const storedItems = JSON.parse(localStorage.getItem("items")) || [];

  const existItem = storedItems.find((stored) => stored.id == item.id);

  if (!existItem) {
    storedItems.push(item);
    localStorage.setItem("items", JSON.stringify(storedItems));
  }
}
