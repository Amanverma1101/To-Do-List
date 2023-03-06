const bodyParser = require("body-parser");
const express = require("express");
const app = express();

const PORT = process.env.PORT || 80;
const authRouter=require('./router/auth-router');


app.set("view engine", "ejs");
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({ extended: true }));

//////////////////////////////
app.use('/',authRouter);

app.listen(PORT, () => {
  console.log(`port is running successfully at server ${PORT} !`);
});