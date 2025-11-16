class Cart {
	cartItems;
	#localName;
	constructor(localName) {
		this.#localName = localName;
		this.#loadstorage();
	}
	#loadstorage() {
		this.cartItems = JSON.parse(localStorage.getItem(this.#localName));
		if (!this.cartItems) {
			this.cartItems = [
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
		}
	}
	saveToStorage() {
		localStorage.setItem(this.#localName, JSON.stringify(this.cartItems));
	}
	addToCart(productId, productQuantity) {
		let mach;
		this.cartItems.forEach((item) => {
			if (productId === item.productId) {
				mach = item;
			}
		});
		if (mach) {
			mach.quantity += productQuantity;
		} else {
			this.cartItems.push({
				productId,
				quantity: productQuantity,
				deliveryOption: "1",
			});
		}
		this.saveToStorage();
	}
	removeCartItem(productId) {
		const newCart = [];
		this.cartItems.forEach((item) => {
			if (item.productId !== productId) {
				newCart.push(item);
			}
		});
		this.cartItems = newCart;
		this.saveToStorage();
	}
	updateDeliveryOption(productId, selectedOption) {
		let mach;

		this.cartItems.forEach((item) => {
			if (productId === item.productId) {
				mach = item;
			}
		});
		mach.deliveryOption = selectedOption;
		this.saveToStorage();
	}
}
const cart = new Cart("cart-oop");
const cartBis = new Cart("cart-bis");

console.log(cart);
console.log(cartBis);
console.log(cartBis instanceof Cart);
