const express = require("express");
const bodyParser = require("body-parser");
const port = process.env.PORT || 3060;

const app = express();

app.use(bodyParser.json());

app.use("/", require(__dirname + "/routes"));

// listen for requests
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
