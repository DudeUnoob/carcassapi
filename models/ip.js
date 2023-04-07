const mongoose = require("mongoose")

mongoose.connect("mongodb+srv://ZeroX:Balaram26@cluster0.b2lzi.mongodb.net/?retryWrites=true&w=majority").then(() => console.log("connected to db"))

const Schema = new mongoose.Schema({
  geolocation:{
    type: Object,
    
  },
  ip: {
    type:String,
    unique: true
  }
})

module.exports = mongoose.model("Carcass_IP", Schema)