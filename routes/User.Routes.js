const express = require('express');
const bcrypt = require('bcrypt');
const jwt=require('jsonwebtoken')
const { UserModel } = require('../model/UserModel');
const { authenticate } = require('../middleware/authenticate.middleware');

const userRouter=express.Router()

userRouter.get('/',authenticate,async(req,res)=>{
    const userID=req.body.user
    const user=await UserModel.findById(userID)
    res.send(user)
})

userRouter.post('/register',async(req,res)=>{
    try {
        const {name,email,password}=req.body
        const userCheck=await UserModel.find({email})
        if(userCheck.length>0){
            res.send({message:"User already exists,please login"})
        }else{
            const hashedPassword=await bcrypt.hash(password,5)
            const user=new UserModel({name,email,password:hashedPassword,time:Date.now()})
            await user.save()
            res.send({message:"User Registered Successfully"})
        }
    } catch (error) {
        res.status(400).json({error:error.message})
    }
})

userRouter.post('/login',async(req,res)=>{
    const {email,password}=req.body
    try {
        const user=await UserModel.find({email})
        if(user.length>0){
            bcrypt.compare(password,user[0].password,(err,result)=>{
                if(result){
                    const token=jwt.sign({userID:user[0]._id},"shhhhh")
                    res.send({message:'Login Successfull',token:token})
                }else{
                    res.send({message:"Wrong Credentials"})
                }
            })
        }else{
            res.send({ message: "Wrong Credentials" });
        }
    } catch (error) {
        res.send({message:"unable to login",error:error.message})
    }
})

module.exports={userRouter}