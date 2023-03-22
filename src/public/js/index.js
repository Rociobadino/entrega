
const socketClient = io()

const addProduct = document.getElementById("addProduct");

const inputTitle = document.getElementById("productTitle");
const inputDescription = document.getElementById("productDescription");
const inputPrice = document.getElementById("productPrice");
const inputCode = document.getElementById("productCode");
// const inputStock = document.getElementById("productStock");
const inputCategory = document.getElementById("productCategory");

const newProduct = {
	title: inputTitle.value,
	description: inputDescription.value,
	price: inputPrice.value,
	// thumbnail: inputThumbnail.value,
	// code: inputCode.value,
	stock: inputStock.value,
	// status: inputStatus.value,
	category: inputCategory.value,
};

addProduct.addEventListener("click", (e) => {
	e.preventDefault();
	const newProduct = {
		title: inputTitle.value,
		description: inputDescription.value,
		price: parseInt(inputPrice.value),
		thumbnail: [],
		// code: parseInt(inputCode.value),
		stock: parseInt(inputStock.value),
		status: true,
		category: inputCategory.value,
	};
	console.log("Product added");
	socketClient.emit("newProduct", newProduct);
});