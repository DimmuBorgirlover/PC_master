// =======================
// КОШИК PC MASTER
// =======================

// Отримання кошика
function getCart() {
    return JSON.parse(localStorage.getItem('pc_store_cart')) || [];
}

// Збереження кошика
function saveCart(cart) {
    localStorage.setItem('pc_store_cart', JSON.stringify(cart));
}

// Додавання товару
function addToCart(name, price) {

    let cart = getCart();

    cart.push({
        name: name,
        price: price
    });

    saveCart(cart);

    alert(`Товар "${name}" додано у кошик!`);

    updateCartCount();
}

// Видалення товару
function removeFromCart(index) {

    let cart = getCart();

    cart.splice(index, 1);

    saveCart(cart);

    renderCart();

    updateCartCount();
}

// Лічильник кошика
function updateCartCount() {

    let cart = getCart();

    const cartLinks = document.querySelectorAll('a[href="cart.html"]');

    cartLinks.forEach(link => {
        link.innerHTML = `Кошик (${cart.length})`;
    });
}

// Відображення кошика
function renderCart() {

    const tableBody = document.getElementById('cart-table-body');
    const totalElement = document.getElementById('total-price');

    if (!tableBody || !totalElement) return;

    let cart = getCart();

    tableBody.innerHTML = '';

    let total = 0;

    if (cart.length === 0) {

        tableBody.innerHTML = `
            <tr>
                <td colspan="3" style="text-align:center;">
                    Кошик порожній
                </td>
            </tr>
        `;

        totalElement.innerText = '0 грн';

        return;
    }

    cart.forEach((item, index) => {

        total += item.price;

        tableBody.innerHTML += `
            <tr>
                <td>${item.name}</td>
                <td>${item.price.toLocaleString()} грн</td>
                <td>
                    <button 
                        class="btn"
                        style="background:#ef4444;"
                        onclick="removeFromCart(${index})"
                    >
                        Видалити
                    </button>
                </td>
            </tr>
        `;
    });

    totalElement.innerText = total.toLocaleString() + ' грн';
}

// Оформлення замовлення
function checkout() {

    let cart = getCart();

    if (cart.length === 0) {

        alert('Кошик порожній!');

        return;
    }

    alert('Замовлення успішно оформлено!');

    localStorage.removeItem('pc_store_cart');

    renderCart();

    updateCartCount();
}

// =======================
// ПОШУК ТОВАРІВ
// =======================

function searchProducts() {

    const searchInput = document.getElementById('search');

    if (!searchInput) return;

    const input = searchInput.value.toLowerCase();

    const cards = document.querySelectorAll('.card');

    cards.forEach(card => {

        const title = card
            .querySelector('h3')
            .textContent
            .toLowerCase();

        if (title.includes(input)) {

            card.style.display = 'block';

        } else {

            card.style.display = 'none';
        }
    });
}



document.addEventListener('DOMContentLoaded', () => {

    updateCartCount();

    renderCart();
});