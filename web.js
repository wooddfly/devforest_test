// ENV
require('dotenv').config();

// DEPENDENCIES
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

// SSR
const { createBundleRenderer } = require("vue-server-renderer");
const services = require("./server/services");


const app = express();
const port = 8001 || 4000;
const cors = require('cors');

//app.use(express.json());
app.use(express.static('./public')); //Static File service
app.use(cors());
// Body-parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Node의 native Promise 사용
mongoose.Promise = global.Promise;
mongoose.set("strictQuery", false);

const URI = "mongodb+srv://devforest443:dev443!!*@projects.eveu7ts.mongodb.net/myProject?retryWrites=true&w=majority";
// Connect to MongoDB
mongoose.connect(URI, {
	useUnifiedTopology: true,
	useNewUrlParser: true,
}).then(() => console.log('Successfully connected to mongodb')).catch(e => console.error(e));

// ROUTERS
app.all('/*', async ({ url}, res, next) => {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "X-Requested-With");
	if (services.checkApi(url)) {
		next();
		return;
	}
	if (services.getSSRPage(url) !== -1) {
		//res.send(await ssrService.getRenderedHtml("ssr", { url }));
		return res.send(await services.renderByServer({ url }));
	} else {
		return res.send(await services.renderByClient({ url }));
	}
});

app.use('/api/project', require('./router/project'));

app.listen(port, () => {
	console.log(`Server listening on port number ${port}`);
	console.log(`listen to http://localhost:${port}`);
});
