import { Router } from 'express';
import ProductManager from '../ProductManager.js';
// import { __dirname } from '../utils.js'
const router = Router();


const productManager = new ProductManager('./Products.json')

router.get('/', async (req, res) => {
    try {
      const products = await productManager.getProducts();
      res.render('home', { products });
    } catch (error) {
      console.log(error);
      res.status(500).json('product search error');
    }
  });

  router.get('/realtimeproducts', async (req, res) => {
    const products = await productManager.getProducts();
    res.render('realTimeProducts', { products });
});

router.post('/realtimeproducts', async (req, res) => {
    try {
      const obj = req.body;
      const newProduct = await productManager.addProducts(obj);
      res.render('realTimeProducts', { newProduct });
    } catch (error) {
      console.error(err);
      res.status(400).json({ error: 'It was not possible to add the product' });
    }
  });

  router.put('/realtimeproducts/:pid', async (req, res) => {
    try {
      const { pid } = req.params;
      const obj = req.body;
      const product = await productManager.updateProduct(+pid, obj);
      res.render('realTimeProducts', { product });
    } catch (error) {
      console.error(err);
      res.status(500).json({ error: 'Error updating the product' });
    }
  });
  
  router.delete('/realtimeproducts/:pid', async (req, res) => {
    try {
      const { pid } = req.params;
      const products = await productManager.deleteProductsById(+pid);
      res.render('realTimeProducts', { products });
    } catch (error) {
      console.error(err);
      res.status(500).json({ error: 'It was not possible to delete the product' });
    }
  });



export default router