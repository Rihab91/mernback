const express=require("express")
const router=express.Router()
const {createProduct,getProducts,getProductById,updateProduct,deleteProduct}=require("../controllers/productController")
router.post('/createproduct',createProduct);
router.get('/get', getProducts);
router.get('/getid/:id',getProductById);
router.put('/update/:id', updateProduct);
router.delete('/delete/:id', deleteProduct);
module.exports=router