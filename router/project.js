const router = require("express").Router();
const Project = require("../models/project");
const ogs = require("open-graph-scraper");
const dataAll = require("../json/projectList.json");
// Find All List

async function getOgsImg(opt) {
	//const options = { url: 'https://www.naver.com/' };
	const options = opt;
	let ogImg;
	const openGraph = await ogs(options)
		.then((data) => {
			const { error, html, result, response } = data;
			//console.log('error:', error);  // This returns true or false. True if there was an error. The error itself is inside the result object.
			//console.log('html:', html); // This contains the HTML of page
			console.log('result:', result.ogImage[0].url); // This contains all of the Open Graph results
			//console.log('response:', response); // This contains response from the Fetch API
			ogImg = result.ogImage[0].url;
			return ogImg;
		});
	return openGraph;
}
router.get('/list',async (req, res) => {
	await Project.findAll()
		.then((projects) => {
			if (projects.length < 1 || !projects.length) {
				return res.send(projects);
			} else {
				let returnData = [];
				for (let i=0; i < projects.length; i++) {
					let thisData = new Object();
					thisData.key = projects[i]._id;
					thisData.thisKey = projects[i].projectId;
					thisData.category = projects[i].projectCategory;
					thisData.item = projects[i].projectTitle;
					thisData.url = projects[i].projectPath;
					thisData.image = projects[i].projectImage;
					thisData.year = projects[i].projectYear;
					JSON.stringify(thisData);
					returnData.push(thisData);
				}
				return res.send(returnData);
			}
		})
		.catch(err => res.status(500));
});

router.get('/create', async (req, res) => {
	let setArray = [];
	dataAll.project.forEach((item) => {
		let thisData = new Object();
		thisData.projectId = new Date().getTime() + Math.random();
		thisData.projectCategory = item.category;
		thisData.projectTitle = item.title;
		thisData.projectPath = item.path;
		thisData.projectImage = item.image;
		thisData.projectYear = item.year;
		JSON.stringify(thisData);
		setArray.push(thisData);
	});
	console.log(setArray);
	await Project.create(setArray);
	/*if(openGraph) {
		Project.create({
			projectId: new Date().getTime() + Math.random(),
			projectCategory: "official",
			projectTitle: "네이버2",
			projectPath: "/",
			//projectImage: ogImg
			projectImage: "@main_project"
		}, {
			projectId: new Date().getTime() + Math.random(),
			projectCategory: "brand",
			projectTitle: "브랜드 네이버",
			projectPath: "/",
			//projectImage: ogImg
			projectImage: "@main_project"
		});
	}*/
});

// Delete by todoid
router.get('/deleteAll', (req, res) => {
	Project.deleteAllByTodoid()
		.then(() => {
			res.sendStatus(200);
			//res.send({result: 1});
		})
		.catch(err => res.status(500).send(err));
});

module.exports = router;
