import fs from 'fs'

class ProductManager {
    constructor(path) {
        this.path = path;
    }

    addProduct = async (product) => {
        if (this.#paramsValidator(product)) {
            const products = await this.getProducts()
            const id = this.#generarID(products)
            const code = this.#codeGenerator(products)
            console.log(code)
            const newProduct = ({ id, code, status: true, ...product })
            products.push(newProduct)
            await fs.promises.writeFile(this.path, JSON.stringify(products, null, 4))
            return newProduct
        } else {
            console.log('Error agregando productos')
        }

    }

    getProducts = async () => {
        if (fs.existsSync(this.path)) {
            const infoProducts = await fs.promises.readFile(this.path, 'utf-8')
            const products = JSON.parse(infoProducts)
            return products
        }
        else {
            console.log('erorr')
            return []
        }
    }

    getProductById = async (id) => {
        const products = await this.getProducts()
        const product = products.find(p => p.id == id)
        if (product) {
            return product
        }
        else {
            return 'Este producto no existe'
        }
    }

    eliminarProducts = async () => {
        if (fs.existsSync(this.path)) {
            await fs.promises.unlink(this.path)
            return 'Archivo eliminado'
        } else {
            return 'Archivo incorrecto, no existe'
        }

    }

    eliminarProductsById = async (id) => {
        const products = await this.getProducts()
        const arrayProductsNuevos = products.filter(p => p.id !== id)
        await fs.promises.writeFile(this.path, JSON.stringify(arrayProductsNuevos, null, 4))
        return arrayProductsNuevos
    }

    updateProducts = async (id, obj) => {
        const products = await this.getProducts();
        const indexProducts = products.findIndex(p => p.id === id)
        if (products === -1) {
            return 'Producto no encontrado'
        } else {
            const productUpdate = { ...products[indexProducts], ...obj }
            products.splice(indexProducts, 1, productUpdate)
            await fs.promises.writeFile(this.path, JSON.stringify(products, null, 4))
            return productUpdate
        }

    };

    //products.splice=decis en que indice queres pararte, cuantos productos eliminar y que producto actualizar.

    #generarID = (products) => {
        let id
        if (products.length === 0) {
            id = 1
        }
        else {
            id = products[products.length - 1].id + 1
        }
        return id

    }

    #codeGenerator(codeLength = 15) {
        const numeros = "0123456789";
        const letras = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
        const numYLetras = numeros + letras;
        let code = "";
        for (let i = 0; i < codeLength; i++) {
            const random = Math.floor(Math.random() * numYLetras.length);
            code += numYLetras.charAt(random);
        }
        return code;
    }

    #paramsValidator(product) {
        if (
            product.title &&
            product.description &&
            product.price &&
            product.stock &&
            product.category &&
            !product.id &&
            !product.code
        ) {
            return true;
        } else {
            if (!product.title) {
                throw new Error(`Falta el title del producto.`);
            } else if (!product.description) {
                throw new Error(`Falta la descripcion del producto.`);
            } else if (!product.price) {
                throw new Error(`Falta el precio del producto.`);
            } else if (!product.stock) {
                throw new Error(`Falta el stock del producto.`);
            } else if (!product.category) {
                throw new Error(`Falta la categoria del producto.`);
            } else if (product.id) {
                throw new Error(`El producto no se debe cargar con el id`);
             } else if (product.code) {
                throw new Error(`El producto no se debe cargar con el code`);
            }
        }
    }

}
export default ProductManager;

// const product1 = {
//     title: 'mochila',
//     description: 'verde',
//     price: '56',
//     stock: '5',
//     category: 'jfbg',
//     thumbnails: 'image'


// }
// const product2 = {
//     title: 'cartuchera',
//     description: 'rosa con brillos',
//     price: '50',
//     stock: '5',
//     category: 'jfbg',
//     thumbnails: 'image'

// }
// const product3 = {
//     title: 'buzo',
//     description: 'rosa con brillos',
//     price: '50',
//     stock: '5',
//     category: 'jfbg',
//     thumbnails: 'image'

// }

// async function prueba() {
//     const manager = new ProductManager('Products.json')
//     const products = await manager.getProducts()
//     await manager.addProduct(product3)
//     console.log(products)
//     // await manager.updateProducts(9,{title: 'buzo'})
//     // await manager.eliminarProductsById(12)
// }



// prueba()