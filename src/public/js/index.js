
const socketClient = io()

const addProduct = document.getElementById('addProduct');

const inputTitle = document.getElementById('productTitle');
const inputDescription = document.getElementById('productDescription');
const inputPrice = document.getElementById('productPrice');
// const inputCode = document.getElementById('productCode');
const inputStock = document.getElementById('productStock');
const inputCategory = document.getElementById('productCategory');

// const newProduct = {
//     title: inputTitle.value,
//     description: inputDescription.value,
//     category: inputCategory.value,
//     price: inputPrice.value,
//     thumbnail: [],
//     // code: inputCode.value,
//     stock: inputStock.value,
//     status: true,
//   };

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


// const deleteProduct = document.querySelector('delete');
// deleteProduct.onclick = (e) => {
//     e.preventDefault();
//     socketClient.emit('delete');
//   };

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

// const deleteProduct = document.getElementsById('delete')

// deleteProduct.addEventListener("click", (e) => {
// 	e.preventDefault();
//   console.log('Producto borrado');
//   socketClient.emit('Producto eliminado')
// })

//   addProduct.onclick = (e) => {
//     e.preventDefault();
//     socketClient.emit('addNewProduct', ...newProduct);
//   };