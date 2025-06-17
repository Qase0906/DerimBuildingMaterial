const navbar = document.querySelector('.nav-bar');
const bars = document.querySelector('.bars')
const cart = document.querySelector('.cart')
const cartPopup = document.querySelector('.cart-popup')
const cancelCartPopup = cartPopup.querySelector('.times')
const productContainer = document.querySelector('.product-container')


// Responsive NavBar
bars.addEventListener('click', (e)=> {
    navbar.classList.toggle('active'); 
    
})

// Display Cart PopUP
cart.addEventListener('click', ()=> {
    cartPopup.classList.toggle('active-popup')

    if(cartPopup.classList.contains('active-popup')){
        document.body.style.overflow = 'hidden';             
    }else {
        document.body.style.overflow = 'auto';
    }
    console.log(cartPopup.className)       
    
})


// JSON FETCH

async function fetchData() {
    
    try {

        const response = await fetch('https://raw.githubusercontent.com/Qase0906/DerimBuildingMaterial/main/products.json')

        const data = await response.json()

        // console.log(data[0])
        displayProduct(data)
        
        
    } catch (error) {
        
    }

}

fetchData();


// Display Product on DOM

function displayProduct(products){

    products.forEach(product => {
        
        const productBox = document.createElement('div')
        productBox.className = 'product-box';
        productBox.innerHTML = `
                    <img src="https://media.istockphoto.com/id/836219748/photo/set-of-construction-materials.jpg?b=1&s=612x612&w=0&k=20&c=bj52lUdeODGFK3bio4tEYLgRQ-2J1andzrH3HQxc6N8=" alt="">
                    <div class="product-content">
                        <p>${product.name}</p>
                        <!-- <h2>Product Name</h2> -->
                        <span><h2>BR200 - 1500</h2></span>
                        <span>Min. order: 1 unit</span>
                        
                        <div class="btn" id="add-to-cart">
                            <button>Add to Cart</button>
                        </div>
                    </div>
                `;
        productContainer.appendChild(productBox);
        console.log(product.name);

    });

    

}
