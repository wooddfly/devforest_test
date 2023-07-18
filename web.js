// ENV
require('dotenv').config();

// DEPENDENCIES
const express = require("express");
const path = require("path");

const app = express();
const port = process.env.PORT || 4000;

//app.set('views', __dirname + '/views');
//app.set('view engine', 'ejs');

//app.use(express.static('./public'));
app.use(express.static(path.join(__dirname, "public")));
//app.use('/public', express.static( __dirname + '/public'));

app.all('/*', async ({ url}, res, next) => {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "X-Requested-With");
	//next();
});

app.get('/', (req, res) => {
	//res.render('index')
	res.sendFile('index.html');
});

app.listen(port, () => {
	console.log(`Server listening on port ${port}`);
	console.log(`listen to http://localhost:${port}`);
});
