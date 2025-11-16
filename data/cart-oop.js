function Cart(localName) {
	const cart = {
		cartItems: undefined,
		loadstorage() {
			this.cartItems = JSON.parse(localStorage.getItem(localName));
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
		},
		saveToStorage() {
			localStorage.setItem(localName, JSON.stringify(this.cartItems));
		},
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
		},
		removeCartItem(productId) {
			const newCart = [];
			this.cartItems.forEach((item) => {
				if (item.productId !== productId) {
					newCart.push(item);
				}
			});
			this.cartItems = newCart;
			this.saveToStorage();
		},
		updateDeliveryOption(productId, selectedOption) {
			let mach;

			this.cartItems.forEach((item) => {
				if (productId === item.productId) {
					mach = item;
				}
			});
			mach.deliveryOption = selectedOption;
			this.saveToStorage();
		},
	};
	return cart;
}
const cart = Cart("cart-oop");
const cartB = Cart("cart-bis");

cart.loadstorage();
cartB.loadstorage();
console.log(cart);
console.log(cartB);
