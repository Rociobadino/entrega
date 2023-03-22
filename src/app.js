import express from 'express';
import productsRouter from './routes/products.router.js';
import cartsRouter from './routes/carts.router.js';
import { __dirname } from "./utils.js";
import handlebars from 'express-handlebars';
import viewsRouter from './routes/views.router.js';
import { Server } from "socket.io";
import ProductManager from './ProductManager.js'
const productManager = new ProductManager('./Products.json')



const app = express();

app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname+'/public'))

//configuracion handlebars
app.engine('handlebars', handlebars.engine())
app.set('views',__dirname+'/views')
app.set('view engine', 'handlebars')

app.use('/api/products', productsRouter)
app.use('/api/carts', cartsRouter)
app.use('/views', viewsRouter)
// app.use('/realTimeProducts',viewsRouter)





const httpServer = app.listen(8080,()=>{
    console.log('escuchando puerto');
})

const socketServer = new Server(httpServer)

socketServer.on('connection',(socket)=>{
    console.log(`cliente conectado: ${socket.id}`);

    socket.on('disconnect',()=>{
        console.log(`usuario desconectado: ${socket.id}`);
    })

    socket.on('newProduct', (newProduct) => {
		productManager.addProduct(newProduct);
		console.log(newProduct);
	});

    // socket.on("deleteProduct", async (id) => {
	// 	console.log(id);
	// 	productManager.eliminarProducts()
	// });

    socket.on("deleteProduct", (productId) => {
		console.log(`Product deleted ${productId}`);
		productManager.eliminarProductsById(productId);
	});

})

