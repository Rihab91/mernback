
const User=require("../models/userModel")
const bcrypt=require("bcrypt")
const jwt=require("jsonwebtoken")
const {validationResult}=require("express-validator")


const Register=async(req,res)=>{
    try {
        const errors=validationResult(req)
        if(!errors.isEmpty()){
            res.status(400).json({msg:errors.array()})
        }
   else{
    console.log("dd")
    const{username,email,password,address,city,zipCode}=req.body
    console.log(req.body)

    const existUser=await User.findOne({email:email})
    console.log(existUser)

    if (existUser){
        res.status(400).json({msg:"User already exist! pls login"})
    }
    else {
        console.log("elses")
        const hashPW=await bcrypt.hash(password,10)
        console.log(hashPW)

    const newUser=await new User(req.body)
    newUser.save()
    console.log(newUser)

    const token=await jwt.sign({id:newUser._id},process.env.JWT_TOKEN,{expiresIn:"7d"})
    console.log(token)

    res.status(201).json({msg:"Registre Done!",token})
   }
    }
} catch (error) {
    res.status(501).json({msg:"something wen wrongt"})
}
}

const Login=async(req,res)=>{
    try {
        const {email,password}=req.body
        const existUser=await User.findOne({email:email})
        if(!existUser){
            console.log(existUser)
            res.status(400).json({msg:"pls make sure to registre!"})

        }
    else{
        bcrypt.compare(password,existUser.password,async(err,data)=>{
            console.log(data)
            if(err){
                res.status(400).json({msg:"wrong password pls try againll!"})}
                else{
                    const token=await jwt.sign({id:existUser._id},process.env.JWT_TOKEN,{expiresIn:"7d"})
                    res.status(200).json({msg:"Login Done!",token})   
                }
        })
       
    }
    } 

    catch (error) {
          res.status(500).json({msg:"something wen wrong"})
    }
}
const UserData=async(req,res)=>{
try {
    const user=await User.findOne({_id:req.userId})
 
    if(!user){
        res.status(400).json({msg:'user not exist'})
    }
    else{
       res.status(200).json({msg:'get user data',user}) 
    }
} catch (error) {
    res.status(500).json({msg:"something wen wrong"}) 
    
}
}

module.exports={Register,Login,UserData}