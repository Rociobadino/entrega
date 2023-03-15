import { Router } from 'express'
const router = Router()
import ProductManager from '../ProductManager.js'
const productManager = new ProductManager('./Products.json')

router.get('/', async (req, res) => {
    try {
        const limit = req.query.limit;

        const products = await productManager.getProducts();
        if (limit) {
            const limitedProducts = products.slice(0, limit);
            res.json(limitedProducts);
        } else {
            res.json(products);
        }
    } catch (err) {
        console.error(err);
        res.json('Error al traer los productos')
    }
})

router.get('/:pid', async (req, res) => {
    try {
        const productId = req.params.pid;
        const product = await productManager.getProductById(productId);

        if (product) {
            res.json(product);
        } else {
            res.status(404).json({ error: 'Producto no encontrado' });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Error al obtener el producto' });
    }

})

router.post('/', async (req, res) => {
    const product = req.body;
    const newProduct = await productManager.addProduct(product);
    !newProduct
        ? res.status(400).json({ error: "No se pudo agregar el producto" })
        : res.status(201).json(newProduct);
});

router.put('/:pid', async (req, res) => {
    try {
        const productId = req.params.pid;
        const product = await productManager.getProductById(productId);
        const modification = req.body;
        if (product) {
         await productManager.updateProducts(parseInt(productId), modification)
            res.send(200).json({message: "producto modificado"})
        } else {
            console.log('error')
        }
    } catch {
        res.sendStatus(500).json({ error: 'Error al actualizar producto' })
    }
   
});

router.delete('/:pid', async (req,res) => {
        const productId = req.params.pid;
        const products = await productManager.eliminarProductsById(parseInt(productId));
        res.json({ products });
      });

    


export default router