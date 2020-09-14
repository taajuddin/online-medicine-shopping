const express=require('express')
require("dotenv").config();
const mongoose=require('mongoose')
const cors=require('cors')
const expressValidator = require('express-validator');
const configureDB = require('./config/database')
// const path =require('path')
const routes = require('./config/routes')

const app=express()
app.use(express.json())
app.use(cors())

app.use('/', routes)

configureDB()


app.use(expressValidator());


app.use(express())
// app.use(express.static(path.join(__dirname,"client/build")))
// app.get("*",(req,res)=>{
// 		res.sendFie(path.join(__dirname + "/client/build/index.html"))
// })

//app.options('*', cors())


const port=process.env.PORT || 8000

app.listen(port, ()=>{
	console.log(`server is running on port ${port}`)
})
