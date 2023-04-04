const express=require('express')
const cors=require('cors')
const { connection } = require('./config/db')
const { userRouter } = require('./routes/User.Routes')
const { calculateRouter } = require('./routes/Calculate.Routes')

const app= express()
app.use(cors())
app.use(express.json())

app.get('/',(req,res)=>{
    res.send('Home Page')
})

app.use('/users',userRouter)
app.use('/calc',calculateRouter)

const port=8080
app.listen(port,async()=>{
    console.log(`server listening on port ${port}`)
    try {
        await connection
        console.log('connected to db')
    } catch (error) {
        console.log('could not connect to db')
        console.log(error.message)
    }
})