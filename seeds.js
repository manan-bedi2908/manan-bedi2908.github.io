var mongoose = require("mongoose");
var Campground = require("./models/campgrounds");
var Comment = require("./models/comment");

var data = [
	{
		name: "Cloud's Rest", 
	 	image: "https://images.unsplash.com/photo-1571069756236-9d9322054086?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
		description: "blah blah blah"
	},
	{
		name: "Desert Mesa", 
	 	image: "https://images.unsplash.com/photo-1440262206549-8fe2c3b8bf8f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
		description: "blah blah blah"
	},
	{
		name: "Canyon Floor", 
	 	image: "https://images.unsplash.com/photo-1497900304864-273dfb3aae33?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
		description: "blah blah blah"
	}
]

function seedDB(){
	Campground.deleteMany({}, function(err){
	if(err){
		console.log(err);
		}
		console.log("Removed Campgrounds");
		//add a few campgrounds
		data.forEach(function(seed) {
			Campground.create(seed, function(err, campground){
				if(err) {
					console.log(err);
				} else {
					console.log("Added a campground");
					//create a comment
					Comment.create(
						{
							text: "This place is great, but i wish there was internet",
							author: "homer"
						}, function(err, comment){
							if(err) {
								console.log(err);
							} else {
								campground.comments.push(comment);
								campground.save();	
								console.log("Created a new comment");
							}
						});
					}
			});
		});
	});	
}

module.exports = seedDB;

