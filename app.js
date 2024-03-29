var express        = require("express"),
	app 	       = express(),
	bodyParser     = require("body-parser"),
	mongoose       = require("mongoose"),
	flash          = require("connect-flash"),
	passport       = require("passport"),
	LocalStrategy  = require("passport-local"),
	methodOverride = require("method-override"),
	Campground     = require("./models/campgrounds"),
	Comment        = require("./models/comment"),
	User           = require("./models/user"),
	router         = express.Router({mergeParams: true}),
    seedDB         = require("./seeds");

//requiring routes
var commentRoutes    = require("./routes/comments"),
	campgroundRoutes = require("./routes/campgrounds"),
	indexRoutes       = require("./routes/index")

//seedDB();

//mongoose.connect("mongodb://localhost:27017/yelp_camp", { useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true });
mongoose.connect("mongodb://jatin:hello@cluster0-shard-00-00-zbphv.mongodb.net:27017,cluster0-shard-00-01-zbphv.mongodb.net:27017,cluster0-shard-00-02-zbphv.mongodb.net:27017/test?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true&w=majority", {
	useNewUrlParser: true, 
	useCreateIndex: true,
	useUnifiedTopology: true
}).then(() => {
	console.log("Connected to DB");
}).catch(err => {
	console.log("error", err.message);	
});

app.use(bodyParser.urlencoded({extended: true}));

app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));
app.use(flash());

//PASSPORT CONFIGURATION
app.use(require("express-session")({
	secret: "Rusty wins",
	resave: false,
	saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req, res, next){
	res.locals.currentUser = req.user;
	res.locals.error = req.flash("error");
	res.locals.success = req.flash("success");
	next();
});

app.use("/", indexRoutes);
app.use("/campgrounds", campgroundRoutes);
app.use("/campgrounds/:id/comments", commentRoutes);

app.listen(3000, function() {
	console.log("The YelpCamp Server Has Started");
});