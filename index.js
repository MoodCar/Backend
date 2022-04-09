const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));


app.get('/', (req, res) => res.json({message : "Server Linked!"}));
require("./routes/user.routes.js")(app);

app.listen(3000, () => console.log('Server Up and running at 3000'));