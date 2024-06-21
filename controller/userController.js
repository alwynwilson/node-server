const users = require('../models/userModal')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt');

exports.registerController = async (req,res)=>{
    console.log("Inside register function");
    const {firstname,email,password} = req.body
    console.log(firstname,email,password);

    try{
        const existingUser = await users.findOne({email})
        if(existingUser){
            res.status(406).json("Account already exists!!! please login")
        }else{
            const hashedPassword = await bcrypt.hash(password, 10);
            const newUser = new users({
                firstname,lastname:"",email,password:hashedPassword,phonenumber:""
            })
            await newUser.save()
            res.status(200).json(newUser)
        }
    }catch(err){
        console.log(err);
        res.status(401).json(err)
    }

}

exports.loginController = async (req,res)=>{
    console.log("inside login function");
    const {email, password} = req.body
    console.log(email,password);
    try{
        const existingUser = await users.findOne({email,password})
        if(existingUser){
            //token generate
            const dehashedpassword = await bcrypt.compare(password, existingUser.password);
            if(dehashedpassword){
            const token = jwt.sign({userId:existingUser._id},process.env.JWT_PASSWORD)
            res.status(200).json({
                user:existingUser,
                token
            })
        }else{
            res.status(404).json("Invalid Email / Password...")
        }
        }else{
            res.status(404).json("User not found...")
        }
    }catch(err){
        res.status(401).json(err)
    }
}

exports.allUsersController = async (req,res)=>{
    console.log("Inside allUsers");
    try{
        const allUser = await users.find().select('-password')
        res.status(200).json(allUser)
    }catch(err){
        res.status(401).json(err)
    }
}

exports.getuserController = async (req,res)=>{
    console.log("Inside getuserController");
    const {pid} = req.params
    try{
        const userDetails = await users.findOne({_id:pid}).select('-password')
        await userDetails.save()
        res.status(200).json(userDetails)
    }catch(err){
        res.status(401).json(err)
    }

}