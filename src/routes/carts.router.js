import { Router } from 'express'
import { ManagerCart } from '../managerCart.js'

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
    const cart = await managerCart.getCart(+cid)
    res.json({ cart })

})

//agregar producto en un carrito
router.post('/:cid/product/id', async (req, res) => {
    const { cid, id } = req.params
    const addProduct = await managerCart.addProductToCart(+cid, id)
    res.json({ message: addProduct })
})



export default router