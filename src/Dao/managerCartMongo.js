import { cartsModel } from '../../db/models/carts.model.js'

export default class managerCart {

    async getCart(id) {
        try {
            const allCart = await cartsModel.find({ _id: id })
            return allCart
        }
        catch (erorr) {
            console.error(erorr)
        }
    }

    async createCart() {
        try {
            const newCart = await cartsModel.create({ products: [] })
            return newCart

        }
        catch (erorr) {
            console.error(erorr)
        }
    }


    // async addProductToCart(cid, pid) {
        // try {
        //     const cart = await cartsModel.findById(cid)
        //     if (cart) {
        //         const addedProductIndex = cart.products.findIndex(
        //             (product) => product.product === pid
        //         );
        //         const addedProductQty =
        //             addedProductIndex !== -1
        //                 ? cart.products[addedProductIndex].qty + 1
        //                 : 1;

        //         const addedProduct = {
        //             product: pid,
        //             qty: addedProductQty,
        //         };

        //         if (addedProductIndex !== -1) {
        //             cart.products[addedProductIndex] = addedProduct;
        //         } else {
        //             cart.products.push(addedProduct);
        //         }
        //         await cart.save();

        //     }

        // } catch (error) {
        //     console.log(error)

        // }
    //     const cart = await this.getCart(cid)
    //         let q = 1;
    //         const obj = {product: pid, quantity: q};
    //         if (!cart) {
    //             return "Cart doesn't exist";
    //           } else {

    //             console.log('carts', cart.products);

    //     }

    // }
}
