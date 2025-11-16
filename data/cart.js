export let cart = JSON.parse(localStorage.getItem("cart")) || [
	{
		productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
		quantity: 1,
		deliveryOption: "1",
	},
	{
		productId: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
		quantity: 2,
		deliveryOption: "2",
	},
];
export function addToCart(productId, productQuantity) {
	let mach;

	cart.forEach((item) => {
		if (productId === item.productId) {
			mach = item;
		}
	});
	if (mach) {
		mach.quantity += productQuantity;
	} else {
		cart.push({ productId, quantity: productQuantity, deliveryOption: "1" });
	}
	saveToStorage();
}
export function showAdded(productId, timeId) {
	const textAdded = document.querySelector(`.js-added-${productId}`);
	textAdded.classList.add("opacity");

	if (timeId) {
		clearTimeout(timeId);
	}
	const timeout = setTimeout(() => {
		textAdded.classList.remove("opacity");
	}, 3000);
	timeId = timeout;
}
export function removeCartItem(productId) {
	const newCart = [];
	cart.forEach((item) => {
		if (item.productId !== productId) {
			newCart.push(item);
		}
	});
	cart = newCart;
	saveToStorage();
}
export function updateCart() {
	let cartCount = 0;
	cart.forEach((item) => {
		cartCount += item.quantity;
	});
	return cartCount;
}

export function updateDeliveryOption(productId, selectedOption) {
	let mach;

	cart.forEach((item) => {
		if (productId === item.productId) {
			mach = item;
		}
	});
	mach.deliveryOption = selectedOption;
	saveToStorage();
}

export function saveToStorage() {
	localStorage.setItem("cart", JSON.stringify(cart));
}

export function loadCart(fun) {
	const xhr = new XMLHttpRequest();
	xhr.addEventListener("load", () => {
		console.log(xhr.response);
		fun();
	});
	xhr.open("GET", "https://supersimplebackend.dev/cart");
	xhr.send();
}
