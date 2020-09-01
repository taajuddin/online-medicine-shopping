const mongoose=require('mongoose')
const Schema = mongoose.Schema
const {ObjectId}=mongoose.Schema


const productSchema=new Schema({
	name:{
			type:String,
			trim:true,
			required:true,
			maxlength:64
		},
		description:{
			type:String,
			required:true,
			maxlength:2000
		},
		price:{
			type:Number ,
			trim:true,
			required:true,
			maxlength:32
		},
		category:{
			type:ObjectId,
			ref:"Category",
			required:true
		},
		
		quantity:{
			type:Number
		},
		sold:{
			type:Number,
			default:0
		},
		photo:{
			data:Buffer,
			contentType:String
		}
},{timestamps:true  })  

const Product=mongoose.model("Product",productSchema)

module.exports=Product