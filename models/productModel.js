const mongoose=require("mongoose")
const productSchema=mongoose.Schema({
    name:{type:String,required:true},
    description:{type:String,required:true},
    quantité:{type:Number,required:true},
    categorie:{type:mongoose.Schema.ObjectId,ref:"Category"},
    prix:{type:Number,required:true},
    image:{type:String,required:true},
 
},
{ timestamps: true}
)
const product=mongoose.model("Product",productSchema)
module.exports=product