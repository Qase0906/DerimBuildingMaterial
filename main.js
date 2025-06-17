const navbar = document.querySelector(".nav-bar");
const bars = document.querySelector(".bars");
const cart = document.querySelector(".cart");
const cartPopup = document.querySelector(".cart-popup");
const cancelCartPopup = cartPopup.querySelector(".times");
const productContainer = document.querySelector(".product-container");

// Responsive NavBar
bars.addEventListener("click", (e) => {
  navbar.classList.toggle("active");
});

// Display Cart PopUP
cart.addEventListener("click", () => {
  cartPopup.classList.toggle("active-popup");

//   if (cartPopup.classList.contains("active-popup")) {
//     document.body.style.overflow = "hidden";
//   } else {
//     document.body.style.overflow = "auto";
//   }
 
});

// JSON FETCH

async function fetchData() {
  try {
    const response = await fetch(
      "https://raw.githubusercontent.com/Qase0906/DerimBuildingMaterial/main/products.json"
    );

    const data = await response.json();

    // console.log(data[0])
    displayProduct(data);
  } catch (error) {}
}

fetchData();

// Display Product on DOM

function displayProduct(products) {
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

    addToCart(productBox, product);
  });
}

// Add to cart

let count = 1;

function addToCart(productBox, product) {
  const addCart = productBox.querySelector(".add-to-cart");
     

    addCart.addEventListener("click", () => {
      const itemsContainer = cartPopup.querySelector(".items-container");
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
      
    //   Count Items in Cart
      const countInCart = cart.querySelector('#cart-count');      
      countInCart.textContent = count++;
      

    });

}



