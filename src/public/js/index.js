
const socketClient = io()

const addProduct = document.getElementById('addProduct');

const inputTitle = document.getElementById('productTitle');
const inputDescription = document.getElementById('productDescription');
const inputPrice = document.getElementById('productPrice');

const inputStock = document.getElementById('productStock');
const inputCategory = document.getElementById('productCategory');


  addProduct.addEventListener("click", (e) => {
	e.preventDefault();
	const newProduct = {
		title: inputTitle.value,
		description: inputDescription.value,
		price: parseInt(inputPrice.value),
		thumbnail: [],
		stock: parseInt(inputStock.value),
		status: true,
		category: inputCategory.value,
	};
	console.log("Product added");
	socketClient.emit("newProduct", newProduct);
});



  const deleteProduct = document.querySelector("#productsTable");

  deleteProduct.addEventListener("click", (e) => {
      e.preventDefault();
      const element = e.target;
      const productId = element.getAttribute("data-id");
      if (element.className === "classDeleteProduct") {
          socketClient.emit("deleteProduct", parseInt(productId));
          document.location.reload()
      }
  });

