import mongoose from "mongoose";


const URI = 'mongodb+srv://rociob0710:Coderhouse51125@coderhouse.k449vud.mongodb.net/Ecommerce?retryWrites=true&w=majority'


mongoose.connect(URI)
.then(()=> console.log('Conectado a la base de datos'))
.catch((error)=>console.error(error))