const express=require('express')
require("dotenv").config();
const mongoose=require('mongoose')
const cors=require('cors')
const expressValidator = require('express-validator');

const app=express()

const configureDB = require('./config/database')
configureDB()
const routes = require('./config/routes')

app.use(expressValidator());
app.use(express.json())
app.use('/', routes)
app.use(express())
app.use(cors())
//app.options('*', cors())


const port=process.env.PORT || 8000

app.listen(port, ()=>{
	console.log(`server is running on port ${port}`)
})
