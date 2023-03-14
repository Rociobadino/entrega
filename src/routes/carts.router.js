import {Router} from 'express'
const router = Router()


router.get('/',(req,res) =>{
    res.send ('ruta cart')
})



export default router