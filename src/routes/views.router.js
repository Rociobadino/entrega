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


export default router