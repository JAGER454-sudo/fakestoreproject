let cart = [];

// Main page render
document.addEventListener("DOMContentLoaded", function() {
    fetch('https://fakestoreapi.com/products')
        .then(res => res.json())
        .then(json => {
            let data1 = "";
            json.forEach(item => {
                data1 += `
                    <div class="container">
                        <h1 class="title">${item.title}</h1>
                        <div class="pic">
                            <img src="${item.image}" alt="${item.title}" width="400" height="300">
                        </div>
                        <h3 class="price">Price $ ${item.price}</h3>
                        <div class="text">${item.description}</div>
                        <h2 class="categories">${item.category}</h2>
                        <button onclick="addToCart(${item.id}, '${item.title}', ${item.price}, '${item.image}')" class="add">Add to Cart</button>
                                        
                        </div>`;
            });
            document.querySelector(".maincontainer").innerHTML = data1;
            showcart();
        })
        .catch(error => console.error('Error fetching products:', error));

    // Electronics category render
    fetch('https://fakestoreapi.com/products/category/electronics')
        .then(res => res.json())
        .then(json => {
            let electronics = "";
            json.forEach(item => {
                electronics += `
                    <div class="electronics-item">
                        <h1 class="title">${item.title}</h1>
                        <div class="pic">
                            <img src="${item.image}" alt="${item.title}" width="400" height="300">
                        </div>
                        <h3 class="price">Price: $${item.price}</h3>
                        <div class="text">${item.description}</div>
                        <h2 class="categories">${item.category}</h2>
                        <button onclick="addToCart(${item.id}, '${item.title}', ${item.price}, '${item.image}')" class="add">Add to Cart</button>
                    </div>`;
            });
            document.querySelector(".electronics-container").innerHTML = electronics;
        })
        .catch(error => console.error('Error fetching electronics:', error));

    // Clothing category render
    Promise.all([
        fetch(`https://fakestoreapi.com/products/category/men's clothing`).then(res => res.json()),
        fetch(`https://fakestoreapi.com/products/category/women's clothing`).then(res => res.json())
    ])
        .then(([mensClothing, womensClothing]) => {
            let clothing = "";

            mensClothing.forEach(item => {
                clothing += `
                    <div class="clothing-item">
                        <h1 class="title">${item.title}</h1>
                        <div class="pic">
                            <img src="${item.image}" alt="${item.title}" width="400" height="300">
                        </div>
                        <h3 class="price">Price: $${item.price}</h3>
                        <div class="text">${item.description}</div>
                        <h2 class="categories">${item.category}</h2>
                        <button onclick="addToCart(${item.id}, '${item.title}', ${item.price}, '${item.image}')" class="add">Add to Cart</button>
                    </div>`;
            });

            womensClothing.forEach(item => {
                clothing += `
                    <div class="clothing-item">
                        <h1 class="title">${item.title}</h1>
                        <div class="pic">
                            <img src="${item.image}" alt="${item.title}" width="400" height="300">
                        </div>
                        <h3 class="price">Price: $${item.price}</h3>
                        <div class="text">${item.description}</div>
                        <h2 class="categories">${item.category}</h2>
                        <button onclick="addToCart(${item.id}, '${item.title}', ${item.price}, '${item.image}')" class="add">Add to Cart</button>
                    </div>`;
            });

            document.querySelector(".Clothing-container").innerHTML = clothing;
        })
        .catch(error => console.error('Error fetching clothing:', error));

    // Jewelry category render
    fetch('https://fakestoreapi.com/products/category/jewelery')
        .then(res => res.json())
        .then(json => {
            let jewelery = "";
            json.forEach(item => {
                jewelery += `
                    <div class="jewelery-item">
                        <h1 class="title">${item.title}</h1>
                        <div class="pic">
                            <img src="${item.image}" alt="${item.title}" width="400" height="300">
                        </div>
                        <h3 class="price">Price: $${item.price}</h3>
                        <div class="text">${item.description}</div>
                        <h2 class="categories">${item.category}</h2>
                        <button onclick="addToCart(${item.id}, '${item.title}', ${item.price}, '${item.image}')" class="add">Add to Cart</button>
                    </div>`;
            });
            document.querySelector(".Jewelery-container").innerHTML = jewelery;
        })
        .catch(error => console.error('Error fetching jewelery:', error));
});


//functionalities//



function popup() {
    const notifElements = document.querySelectorAll(".notifmodal");
    
    // Loop through each element and set the style
    notifElements.forEach((notif) => {
        notif.style.display = "block";
        
        setTimeout(() => {
            notif.style.display = "none";
        }, 1000);
    });
}




function addToCart(id, title, price, image) {
    const existingItem = cart.find(item => item.id === id);

    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push({ id, title, price, image, quantity: 1 });
    }
    
    popup();
    updateCart();
}


function checkout() {

 if (cart == 0 ) {
    console.log ("cart is empty")
   
 } else {

    console.log('Checkout process started');
    checkoutpopup();
    clearCart();
    updateCart();}
}



function checkoutpopup() {
    const checknotif = document.querySelector('.notifcheckout');
    checknotif.style.display = "block";

    setTimeout(() => {
        checknotif.style.display = "none";
    }, 1000);
}
function clearCart(){
    cart = [];
}

function showcart() {
    const cartmodal = document.querySelector('.cartmodal');
    const openBtns = document.querySelectorAll('.cart, .cart-page'); // Select both .cart and .cart-page
    const closeBtn = document.querySelector('#close-cart');

    // Add click event listener to each cart button
    openBtns.forEach(btn => {
        btn.addEventListener('click', (event) => {
            event.preventDefault(); // Prevent default link behavior
            cartmodal.classList.add('show');
        });
    });

    
    closeBtn.addEventListener('click', () => {
        cartmodal.classList.remove('show');
    });

    // Hide the cart modal when clicking outside of it
    window.addEventListener('click', (event) => {
        if (event.target === cartmodal) {
            cartmodal.classList.remove('show');
        }
    });
}



// Initialize the showcart function
document.addEventListener('DOMContentLoaded', showcart);




function updateCart() {
    const cartCount = document.getElementById('cart-count');
    cartCount.innerText = cart.reduce((total, item) => total + item.quantity, 0);

    const cartItems = document.getElementById('cart-items');
    cartItems.innerHTML = '';
    let totalPrice = 0;
    cart.forEach(item => {
        const cartItem = document.createElement('div');
        cartItem.className = 'cart-item';
        cartItem.innerHTML = `
     <div class="items">
            <img class="itm-img" src="${item.image}" alt="${item.title}" width="50">
            <span class="itm-title">${item.title}</span>
            <span class="itm-prc">$${item.price} x ${item.quantity}</span>
            <div class="order">
                <button class="remove-item" onclick="removeFromCart(${item.id})">Remove</button>
                
            </div>
        </div>
        `;
        cartItems.appendChild(cartItem);
        totalPrice += item.price * item.quantity;
    });
    document.getElementById('total-price').innerText = totalPrice.toFixed(2);
}

function removeFromCart(id) {
    cart = cart.filter(item => item.id !== id);
    updateCart();
}
//navbar toggle

const menu = document.querySelector('.sidebar')

function togglebtn() {
      menu.style.display='flex'
}
function closemenu() {
    
    menu.style.display='none';
}


