const express = require("express")
const app = express()
const bodyParser = require("body-parser")
const ipModel = require('./models/ip')
const cors = require("cors")

app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.get('/', (req, res) => {
  res.send("Carcass Server API")
})

const handleErrors = (req, res, next, err) => {
  let errors = { email: "", password: "", username: "" };

  console.log(err);
  

  if (err.code === 11000) {
    return res.json({ message: "Already logged ip in the database", geolocation: req.body.ip })
  }

  if (err.message.includes("Users validation failed")) {
    Object.values(err.errors).forEach(({ properties }) => {
      errors[properties.path] = properties.message;
    });
  }

  return errors;
  next()
};
app.post('/api/v1/ip', (req, res, next) => {
  const ip = req.body.ip.IPv4

 
      new ipModel({
    geolocation: req.body.ip,
    ip: ip
  }).save()
  .then(doc => {
    return res.json({ message: "Successfully added ip to database", geolocation: req.body.ip })
  })
  .catch(err => {
    handleErrors(req, res, next, err)
  })
  


  
})

app.listen(3000, () => {
  console.log("listening on port 3000")
})