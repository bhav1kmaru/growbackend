const express = require("express");

const calculateRouter=express.Router()

calculateRouter.post('/',async(req,res)=>{
   const {aia,air,years}=req.body
   const totalMaturityValue=roi(+aia,+air,+years)
   const totalInvestmentAmount=aia*years
   const totalInterestGained=totalMaturityValue-totalInvestmentAmount
   res.send({totalMaturityValue,totalInvestmentAmount,totalInterestGained})
})

const roi=(aia,air,years)=>{
    air=air/100
    const result = Math.floor(aia * (((air + 1) ** years - 1) / air));
    return result
}

module.exports={calculateRouter}