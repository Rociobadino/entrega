import fs from 'fs'

export default class ManagerCart {
    constructor(path) {
        this.path = path;
    }


    async getCarts() {
        if (fs.existsSync(this.path)) {
            const cartsFile = await fs.promises.readFile(this.path, 'utf-8')
            return JSON.parse(cartsFile)
        } else {
            return []
        }
    }

    async getCart(id) {
        const cartsFile = await this.getCarts();
        const cart = cartsFile.find(cart => cart.id === id)
        if (cart) {
            return cart
        } else {
            return null
        }

    }
    async createCart(products = []) {
        const cartsFile = await this.getCarts();
        const newCart = {
            id: this.#generarID(cartsFile),
            products 
        }
        cartsFile.push(newCart)
        await fs.promises.writeFile(this.path, JSON.stringify(cartsFile))
        return newCart

    }
    async addProductToCart(cid, pid) {
        const cart = await this.getCart(cid)
        if (!cart) return 'cart not found'
        const productIndex = cart.products.findIndex(p => p.product === pid)
        if (productIndex === -1) {
            cart.products.push({ product: pid, quantity: 1 })
        } else {
            cart.products[productIndex].quantity++
        }
        const cartsFile = await this.getCarts()
        const cartIndex = cartsFile.findIndex(c => c.id === cid)
        cartsFile.splice(cartIndex, 1, cart)
        await fs.promises.writeFile(this.path, JSON.stringify(cartsFile))
        return 'product added'

    }
    #generarID = (carts) => {
        let id
        if (carts.length == 0) {
            id = 1
        }
        else {
            id = carts[carts.length - 1].id + 1
        }
        return id
    }

}


