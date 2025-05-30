const mongoose=require("mongoose");

const schema=mongoose.Schema;

const customerSchema=new schema(
    {
        firstName:String,
        lastName:String,
        email:String,
        telephone:Number,
        age:Number,
        countery:String,
        gender:String,
    },
    {timestamps:true}
)

const customersData= mongoose.model("customer",customerSchema);
module.exports=customersData;