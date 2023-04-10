
import { productsModel } from '../../db/models/products.models.js'


export default class ProductManager {

    async getProducts(){
        try{
            const allProducts = await productsModel.find()
            return allProducts
        }
        catch(erorr){
           console.error(erorr)
        }
    }

    async getProductById(id){
        try{
            const idProduct = await productsModel.findById(id)
            return idProduct
        }
        catch(erorr){
           console.error(erorr)
        }
    }

    async addProduct(obj){
        try{
            const newProduct = await productsModel.create(obj)
            return newProduct
            
        }
        catch(erorr){
           console.error(erorr)
        }
    }

    async eliminarProductsById(id){
        try{
            const newProducts = await productsModel.deleteOne({ _id: id })
            return newProducts
            
        }
        catch(erorr){
           console.error(erorr)
        }
    }


    }
