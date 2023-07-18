// ENV
require('dotenv').config();

// DEPENDENCIES
const express = require("express");

const app = express();
const port = process.env.PORT || 4000;

//app.use(express.static('./public')); 

app.all('/*', async ({ url}, res, next) => {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "X-Requested-With");
	next();
});

app.get('/', (req, res) => {
	res.render('index')
});

app.listen(port, () => {
	console.log(`Server listening on port ${port}`);
	console.log(`listen to http://localhost:${port}`);
});
