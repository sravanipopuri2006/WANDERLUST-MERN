const mongoose=require("mongoose");
const listings=require("../models/listings.js")
let initData=require("./data.js")
main().then(()=>{
    console.log("DB connected")
})
.catch((err)=>{
    console.log("some error occured");
})
async function main(){
    mongoose.connect('mongodb://127.0.0.1:27017/wanderlust');
}
async function initialize(){

    await listings.deleteMany({});
    initData.data=initData.data.map((obj)=>({...obj,owner:"68032f20a1b350f888de738f" }));
    await listings.insertMany(initData.data);
    console.log("inserted")

}
initialize();
