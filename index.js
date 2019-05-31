const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const passport = require("passport");
require('dotenv').config();

const PORT = process.env.PORT || 5001;
const models = require("./models");
const routes = require("./routes")
const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));

app.use(passport.initialize());

require('./config/passport')(passport);

app.use("/api", routes)



models.sequelize.sync({force: false}).then(()=>{
  app.listen(PORT, ()=>{
    console.log("listening on port "+ PORT)
  })
})
