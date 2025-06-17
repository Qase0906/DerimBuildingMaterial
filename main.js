const navbar = document.querySelector('.nav-bar');
const bars = document.querySelector('.bars')
const cart = document.querySelector('.cart')
const cartPopup = document.querySelector('.cart-popup')
const cancelCartPopup = cartPopup.querySelector('.times')


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

