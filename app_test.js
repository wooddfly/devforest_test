// ENV
require('dotenv').config();

// DEPENDENCIES
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

// SSR
const { createBundleRenderer } = require("vue-server-renderer");
const services = require("./server/services");


const app_test = express();
const port = process.env.PORT || 4000;
const cors = require('cors');

//app_test.use(express.json());
app_test.use(express.static('./public')); //Static File service
app_test.use(cors());
// Body-parser
app_test.use(bodyParser.urlencoded({ extended: true }));
app_test.use(bodyParser.json());

// Node의 native Promise 사용
mongoose.Promise = global.Promise;
mongoose.set("strictQuery", false);

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
	useUnifiedTopology: true,
	useNewUrlParser: true,
}).then(() => console.log('Successfully connected to mongodb')).catch(e => console.error(e));

// ROUTERS
app_test.all('/*', async ({ url}, res, next) => {
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

app_test.use('/api/project', require('./router/project'));

app_test.listen(port, () => {
	console.log(`Server listening on port number ${port}`);
	console.log(`listen to http://localhost:${port}`);
});
