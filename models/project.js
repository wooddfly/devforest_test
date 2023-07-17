const mongoose = require('mongoose');

// Define Schemes
const projectSchema = new mongoose.Schema({
		projectId: { type: Number, required: true, unique: true },
		projectCategory: { type: String, required: true },
		projectTitle: { type: String, required: true },
		projectPath: { type: String, required: true },
		projectImage: { type: String, required: true },
		projectYear: { type: Number, required: true },
		//Type: { type: Number, required: true },
		//completed: { type: Boolean, default: false }
	},
	{
		timestamps: true
	});

// Find All
/*
projectSchema.statics.findAll = () => {
	return this.find({});
};
*/
projectSchema.statics.findAll = function () {
	return this.find({});
};

projectSchema.statics.deleteAllByTodoid = function () {
	return this.remove();
};

module.exports = mongoose.model('Project', projectSchema);
const Project = mongoose.model('Project', projectSchema)

Project.find({ }, function (err, project) {
	if(err) throw err;
})
