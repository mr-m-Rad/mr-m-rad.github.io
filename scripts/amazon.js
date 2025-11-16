import { cart, addToCart, showAdded } from "../data/cart.js";
import { products, loadProducts } from "../data/products.js";
loadProducts(renderHome);
function renderHome() {
	let productHtml = "";
	products.forEach((product) => {
		productHtml += `<div class="product-container">
        <div class="product-image-container">
            <img
                class="product-image"
                src="${product.image}"
            />
        </div>

        <div class="product-name limit-text-to-2-lines">
            ${product.name}
        </div>

        <div class="product-rating-container">
            <img
                class="product-rating-stars"
                src="${product.getStarsUrl()}"
            />
            <div class="product-rating-count link-primary">${
							product.rating.count
						}</div>
        </div>

        <div class="product-price">$${product.getPrice()}</div>

        <div class="product-quantity-container">
            <select class="js-quantity-${product.id}">
                <option selected value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
                <option value="7">7</option>
                <option value="8">8</option>
                <option value="9">9</option>
                <option value="10">10</option>
            </select>
        </div>

        ${product.infoHtml()}

        <div class="product-spacer"></div>

        <div class="added-to-cart js-added-${product.id}">
            <img src="images/icons/checkmark.png" />
            Added
        </div>

        <button data-product-id="${
					product.id
				}" class="add-to-cart-button button-primary js-add-to-cart  ">Add to Cart</button>
    </div>`;
	});
	function updateCart() {
		let cartCount = 0;
		cart.forEach((item) => {
			cartCount = cartCount + item.quantity;
		});
		if (cartCount === 0) {
			cartCount = "";
		}
		document.querySelector(".js-cart-quantity").innerHTML = cartCount;
	}

	document.querySelector(".js-products-grid").innerHTML = productHtml;
	document.querySelectorAll(".js-add-to-cart").forEach((button) => {
		button.addEventListener("click", () => {
			let timeId;
			const { productId } = button.dataset;
			const productQuantity1 = document.querySelector(
				`.js-quantity-${productId}`
			).value;

			const productQuantity = Number(productQuantity1);
			addToCart(productId, productQuantity);
			showAdded(productId, timeId);
			updateCart();
		});
	});
	updateCart();
}
