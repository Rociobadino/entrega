import { Router } from 'express'
// import ManagerCart  from '../Dao/managerCart.js'
import  ManagerCart  from '../Dao/managerCartMongo.js';

const router = Router()
const managerCart = new ManagerCart('./Carts.json');

//crear carrito
router.post('/', async (req, res) => {
    const newCart = await managerCart.createCart()
    res.json({ cart: newCart })

})
//buscar carrito
router.get('/:cid', async (req, res) => {
    const { cid } = req.params
    const cart = await managerCart.getCart(cid)
    res.json({ cart })

})

//agregar producto en un carrito
router.post('/:cid/product/:pid', async (req, res) => {
    const { cid, id } = req.params
    const addProduct = await managerCart.addProductToCart(cid, id)
    res.json({ message: addProduct })
})

// router.post("/:cid/product/:pid", async (req, res) => {
//     const { cid, pid } = req.params;
//     const product = await productManager.getCart(parseInt(pid));
//     if (product) {
//       const cart = await managerCart.addProductToCart(parseInt(cid), parseInt(pid));
//       !cart ? res.status(404).json(notFound) : res.status(200).json(cart);
//     } else {
//       res.status(404).json({ error: "Product not found" });
//     }
//   });
  


export default router