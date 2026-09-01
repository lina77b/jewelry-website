document.addEventListener('DOMContentLoaded', () => {
    const products = {
        bagues: [
            { id: 1, name: "Bague Argent", price: 2500 },
            { id: 2, name: "Bague argent rhodié", price: 2300 },
            { id: 3, name: "Bague Argent Rhodié Pandora", price: 2700 },
            { id: 4, name: "Bague en Plaqué Or", price: 500 },
            { id: 5, name: "Bague feuille en argent et zircon Anushka Sharma", price: 3500 },
            { id: 6, name: "Bague Or", price: 3000 },
            { id: 7, name: "Bague Doré", price: 5000 },
            { id: 8, name: "Bague infini", price: 3800 }
        ],
        boucles: [
            { id: 9, name: "Boucles d'oreilles célestes", price: 2500 },
            { id: 10, name: "Créoles Elvyn Argent Blanc", price: 2500 },
            { id: 11, name: "Boucles D'oreilles Puces Jannea Argent Rose", price: 1500 },
            { id: 12, name: "Créoles Carmeline Acier Blanc", price: 2500 },
            { id: 13, name: "Créoles Maia Acier Doré", price: 2500 },
            { id: 14, name: "Boucles D'oreilles Pendantes", price: 2500 },
            { id: 15, name: "Boucles D'oreilles Pendantes Ishaae", price: 2500 },
            { id: 16, name: "Boucles D'oreilles Pendantes Lio", price: 2500 }
        ],
        colliers: [
            { id: 17, name: "Collier Donatiane Argent Blanc", price: 2500 },
            { id: 18, name: "Collier Plaqué Or Jaune Lettra", price: 2300 },
            { id: 19, name: "Collier Or Jaune Nacre Ange", price: 2300 },
            { id: 20, name: "Collier Hallie Or Jaune Malachite", price: 500 },
            { id: 21, name: "Collier Sulivia Papillon Or Jaune", price: 3900 },
            { id: 22, name: "Collier Alexine Or Jaune Zirconium", price: 3300 },
            { id: 23, name: "Collier Hilarionne Argent Blanc Ambre", price: 5000 },
            { id: 24, name: "Collier Lovina Or Jaune", price: 3800 }
        ],
        bracelets: [
            { id: 25, name: "Bracelet minimaliste avec coquillage", price: 2500 },
            { id: 26, name: "Bracelet de perles", price: 2000 },
            { id: 27, name: "Bracelet cœurs", price: 3500 },
            { id: 28, name: "Bracelet à lune et étoile", price: 3500 },
            { id: 29, name: "Bracelet Argent Blanc", price: 2500 },
            { id: 30, name: "Bracelet double initial avec cœur", price: 1500 },
            { id: 31, name: "Bracelet Jonc Imae", price: 2000 },
            { id: 32, name: "Bracelet Jonc Maisha Argent Blanc", price: 2000 }
        ]
    };

    let cart = [];
    const SHIPPING_COST = 500;

    const savedCart = localStorage.getItem('lunajewelry-cart');
    if (savedCart) {
        try {
            cart = JSON.parse(savedCart);
        } catch (e) {
            console.error('Erreur lors du chargement du panier:', e);
            cart = [];
        }
    }

    function saveCart() {
        try {
            localStorage.setItem('lunajewelry-cart', JSON.stringify(cart));
        } catch (e) {
            console.error('Erreur lors de la sauvegarde du panier:', e);
        }
    }

    window.addToCart = function(id, name, price) {
        id = parseInt(id);
        price = parseFloat(price);
        if (!id || !name || isNaN(price)) {
            console.error('Erreur: paramètres invalides pour addToCart', { id, name, price });
            return;
        }
        const existingItem = cart.find(item => item.id === id);
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            cart.push({ id, name, price, quantity: 1 });
        }
        updateCartDisplay();
        saveCart();
        alert(`${name} a été ajouté au panier !`);
    };

    window.removeFromCart = function(id) {
        id = parseInt(id);
        cart = cart.filter(item => item.id !== id);
        updateCartDisplay();
        saveCart();
    };

    window.updateQuantity = function(id, quantity) {
        id = parseInt(id);
        quantity = parseInt(quantity) || 1;
        if (quantity < 1) quantity = 1;
        const item = cart.find(item => item.id === id);
        if (item) {
            item.quantity = quantity;
            updateCartDisplay();
            saveCart();
        }
    };

    function updateCartDisplay() {
        const cartItems = document.getElementById('cart-items');
        const cartCountElements = document.querySelectorAll('#cart-count');
        const subtotalSpan = document.getElementById('subtotal');
        const shippingSpan = document.getElementById('shipping');
        const totalSpan = document.getElementById('total');

        if (cartItems && subtotalSpan && shippingSpan && totalSpan) {
            cartItems.innerHTML = '';
            if (cart.length === 0) {
                cartItems.innerHTML = '<tr><td colspan="5">Le panier est vide</td></tr>';
                subtotalSpan.textContent = '0,00 DZD';
                shippingSpan.textContent = '0,00 DZD';
                totalSpan.textContent = '0,00 DZD';
                document.getElementById('validate-cart-btn').disabled = true;
            } else {
                let totalItems = 0;
                cart.forEach(item => {
                    totalItems += item.quantity;
                    const row = document.createElement('tr');
                    row.innerHTML = `
                        <td>${item.name}</td>
                        <td>${item.price.toFixed(2)} DZD</td>
                        <td><input type="number" min="1" value="${item.quantity}" onchange="updateQuantity(${item.id}, this.value)"></td>
                        <td>${(item.price * item.quantity).toFixed(2)} DZD</td>
                        <td><button onclick="removeFromCart(${item.id})" class="btn">Supprimer</button></td>
                    `;
                    cartItems.appendChild(row);
                });

                const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
                const total = subtotal + (cart.length > 0 ? SHIPPING_COST : 0);

                subtotalSpan.textContent = `${subtotal.toFixed(2)} DZD`;
                shippingSpan.textContent = `${(cart.length > 0 ? SHIPPING_COST : 0).toFixed(2)} DZD`;
                totalSpan.textContent = `${total.toFixed(2)} DZD`;
                document.getElementById('validate-cart-btn').disabled = false;
            }

            cartCountElements.forEach(el => {
                el.textContent = cart.reduce((sum, item) => sum + item.quantity, 0) || 0;
            });
        }
    }

    window.validateCart = function() {
        if (cart.length === 0) {
            alert('Votre panier est vide !');
            return;
        }
        const cartTable = document.getElementById('cart-table');
        const cartSummary = document.getElementById('cart-summary');
        const deliveryForm = document.getElementById('delivery-form');
        if (cartTable && cartSummary && deliveryForm) {
            cartTable.style.display = 'none';
            cartSummary.style.display = 'none';
            deliveryForm.style.display = 'block';
        } else {
            alert('Erreur: impossible de valider le panier en raison d\'éléments manquants.');
        }
    };

    window.proceedToPayment = function(event) {
        event.preventDefault();
        const name = document.getElementById('name').value;
        const address = document.getElementById('address').value;
        const phone = document.getElementById('phone').value;
        const wilaya = document.getElementById('wilaya').value;
        const deliveryForm = document.getElementById('delivery-form');
        const paymentForm = document.getElementById('payment-form');

        if (!name || !address || !phone || !wilaya) {
            alert('Veuillez remplir tous les champs de livraison.');
            return;
        }

        if (deliveryForm && paymentForm) {
            deliveryForm.style.display = 'none';
            paymentForm.style.display = 'block';
        }
    };

    window.confirmOrder = function(event) {
        event.preventDefault();
        const payment = document.getElementById('payment').value;
        const name = document.getElementById('name').value;
        const address = document.getElementById('address').value;
        const phone = document.getElementById('phone').value;
        const wilaya = document.getElementById('wilaya').value;
        const paymentForm = document.getElementById('payment-form');
        const orderDetails = document.getElementById('order-details');
        const orderContent = document.getElementById('order-content');

        if (!payment) {
            alert('Veuillez sélectionner un mode de paiement.');
            return;
        }

        let orderHTML = `
            <p><strong>Nom:</strong> ${name}</p>
            <p><strong>Adresse:</strong> ${address}</p>
            <p><strong>Téléphone:</strong> ${phone}</p>
            <p><strong>Wilaya:</strong> ${wilaya}</p>
            <p><strong>Mode de paiement:</strong> ${
                payment === 'credit' ? 'Carte de crédit' :
                payment === 'BaridiMob' ? 'BaridiMob' : 'Paiement à la livraison'
            }</p>
            <h4>Articles commandés:</h4>
            <ul>
        `;
        cart.forEach(item => {
            orderHTML += `<li>${item.name} (x${item.quantity}) - ${(item.price * item.quantity).toFixed(2)} DZD</li>`;
        });
        const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
        const total = subtotal + (cart.length > 0 ? SHIPPING_COST : 0);
        orderHTML += `
            </ul>
            <p><strong>Sous-total:</strong> ${subtotal.toFixed(2)} DZD</p>
            <p><strong>Frais de livraison:</strong> ${(cart.length > 0 ? SHIPPING_COST : 0).toFixed(2)} DZD</p>
            <p><strong>Total:</strong> ${total.toFixed(2)} DZD</p>
            <p class="success">Votre commande a été confirmée. Merci pour votre achat!</p>
        `;

        if (orderContent && orderDetails && paymentForm) {
            orderContent.innerHTML = orderHTML;
            orderDetails.style.display = 'block';
            paymentForm.style.display = 'none';
            cart = [];
            updateCartDisplay();
            saveCart();
            document.getElementById('delivery-details').reset();
            document.getElementById('payment-details').reset();
        }
    };

    document.getElementById('validate-cart-btn')?.addEventListener('click', validateCart);
    document.getElementById('delivery-details')?.addEventListener('submit', proceedToPayment);
    document.getElementById('payment-details')?.addEventListener('submit', confirmOrder);

    updateCartDisplay();

   
    const sliderWrapper = document.querySelector('.slider-wrapper');
    const slides = document.querySelectorAll('.slide');
    const prevBtn = document.querySelector('.gauche-btn');
    const nextBtn = document.querySelector('.droite-btn');

    if (sliderWrapper && slides.length > 0 && prevBtn && nextBtn) {
        let currentSlide = 0;
        const totalSlides = slides.length;

        function goToSlide(index) {
            if (index >= totalSlides) {
                currentSlide = 0;
            } else if (index < 0) {
                currentSlide = totalSlides - 1;
            } else {
                currentSlide = index;
            }
            const translateValue = -currentSlide * (100 / totalSlides) + '%';
            sliderWrapper.style.transform = 'translateX(' + translateValue + ')';
        }

        prevBtn.addEventListener('click', () => {
            goToSlide(currentSlide - 1);
        });

        nextBtn.addEventListener('click', () => {
            goToSlide(currentSlide + 1);
        });

        let slideInterval = setInterval(() => {
            goToSlide(currentSlide + 1);
        }, 4000);

        sliderWrapper.addEventListener('mouseenter', () => {
            clearInterval(slideInterval);
        });

        sliderWrapper.addEventListener('mouseleave', () => {
            slideInterval = setInterval(() => {
                goToSlide(currentSlide + 1);
            }, 4000);
        });
    }

 
    const signupForm = document.getElementById('inscription');
    const passwordInput = document.getElementById('password');
    const confirmPasswordInput = document.getElementById('confirm-password');
    const passwordMatchError = document.getElementById('password-match-error');
    const passwordStrengthError = document.getElementById('password-strength-error');

    if (signupForm && passwordInput && confirmPasswordInput && passwordMatchError && passwordStrengthError) {
        confirmPasswordInput.addEventListener('input', () => {
            const passwordsMatch = passwordInput.value === confirmPasswordInput.value;
            passwordMatchError.classList.toggle('active', !passwordsMatch);
        });

        passwordInput.addEventListener('input', () => {
            const password = passwordInput.value;
            const minLength = password.length >= 8;
            const hasUpperCase = /[A-Z]/.test(password);
            const hasLowerCase = /[a-z]/.test(password);
            const hasNumber = /[0-9]/.test(password);
            const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
            const isStrong = minLength && hasUpperCase && hasLowerCase && hasNumber && hasSpecialChar;
            passwordStrengthError.classList.toggle('active', !isStrong);

            const passwordsMatch = passwordInput.value === confirmPasswordInput.value;
            passwordMatchError.classList.toggle('active', !passwordsMatch && confirmPasswordInput.value);
        });

        signupForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const password = passwordInput.value;
            const minLength = password.length >= 8;
            const hasUpperCase = /[A-Z]/.test(password);
            const hasLowerCase = /[a-z]/.test(password);
            const hasNumber = /[0-9]/.test(password);
            const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
            const isStrong = minLength && hasUpperCase && hasLowerCase && hasNumber && hasSpecialChar;

            if (!isStrong) {
                passwordStrengthError.classList.add('active');
                return;
            }
            if (password !== confirmPasswordInput.value) {
                passwordMatchError.classList.add('active');
                return;
            }

            alert('Inscription réussie !');
            signupForm.reset();
            passwordMatchError.classList.remove('active');
            passwordStrengthError.classList.remove('active');
        });
    }


    document.getElementById('formulaireContact')?.addEventListener('submit', function(event) {
        event.preventDefault();
        alert('Votre message a bien été envoyé ! Nous vous contacterons bientôt.');
        this.reset();
    });


    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const hamburger = document.querySelector('.hamburger');
    const dropdowns = document.querySelectorAll('.dropdown');

    if (!navToggle || !navMenu || !hamburger) {
        console.error('Hamburger menu elements missing:', {
            navToggle: !!navToggle,
            navMenu: !!navMenu,
            hamburger: !!hamburger
        });
        return;
    }

    navToggle.addEventListener('click', () => {
        console.log('Hamburger clicked');
        navMenu.classList.toggle('active');
        hamburger.classList.toggle('active');
    });

    document.addEventListener('click', (event) => {
        if (!navMenu.contains(event.target) && !navToggle.contains(event.target)) {
            console.log('Clicked outside menu');
            navMenu.classList.remove('active');
            hamburger.classList.remove('active');
        }
    });

    dropdowns.forEach(dropdown => {
        const dropdownLink = dropdown.querySelector('.nav-link');
        const dropdownMenu = dropdown.querySelector('.dropdown-menu');

        if (dropdownLink && dropdownMenu) {
            dropdownLink.addEventListener('click', (event) => {
                if (window.innerWidth <= 768) {
                    event.preventDefault();
                    console.log('Dropdown toggled on mobile');
                    dropdown.classList.toggle('active');
                }
            });
        }
    });

    window.addEventListener('resize', () => {
        if (window.innerWidth > 768) {
            navMenu.classList.remove('active');
            hamburger.classList.remove('active');
            dropdowns.forEach(dropdown => dropdown.classList.remove('active'));
        }
    });
});