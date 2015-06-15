

var myUserRes;
var url = require("url");
var express = require('express');
var bodyParser = require("body-parser");
var app = express();
var port = process.env.PORT || 8080;
var path = require('path');
var mongoose = require('mongoose');
var myUsersSchema = require("./userSchema").myUsersSchema;





// Includes Includes Includes Includes Includes Includes Includes Includes Includes Includes Includes Includes Includes Includes Includes

app.use(express.static("publicDir"));

app.use('/publicDir/img',express.static(path.join(__dirname, 'publicDir/img')));
app.use('/publicDir/js',express.static(path.join(__dirname, 'publicDir/js')));
app.use('/publicDir/css',express.static(path.join(__dirname, 'publicDir/css')));
app.use('/publicDir/js/lib/angular',express.static(path.join(__dirname, 'publicDir/js/lib/angular')));
app.use('/publicDir/css/bootstrap',express.static(path.join(__dirname, 'publicDir/css/bootstrap')));


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});


// Includes Includes Includes Includes Includes Includes Includes Includes Includes Includes Includes Includes Includes Includes Includes








// ##################################################### LOGIN START ################################################################

app.post("/login", function(req, res){

	mongoose.connect('mongodb://allUsers:135792468@ds047752.mongolab.com:47752/apartment');
	mongoose.model('myUsers', myUsersSchema);

	var db = mongoose.connection;


    console.log("\n\n------------------------------------------------------------------");
    console.log("\n\nLogin Called");
    console.log("\n\nGOT POST BY : user = "+req.body.mail+", pass = "+req.body.pass);
  	console.log("\n\nWaiting For Mongo DB Connection");
	
	


	db.once('open', function(){


 		console.log("\n\nMongo DB Connection Received");
		
		var aUser = this.model("myUsers");


		aUser.findOne({ $and: [ { mail: req.body.mail} , {pass: req.body.pass} ] } , function (err, doc){


			myUserRes = doc;

			if(myUserRes == null){


				console.log('\n\nUSER FAILED RESPONSE');
				res.writeHead(200);
				res.write("Failed Loging in, Please Check Your Login Info Once More p=");
				res.end();

			}else{


				console.log('\n\nUser Logged : ' + myUserRes.mail);

       			 res.writeHeader(200, {"Content-Type": "text/html"});
			    res.sendFile( __dirname + "/home.html");

			}
			mongoose.disconnect();
			db.close();
		});


	});



});

// ##################################################### LOGIN END ################################################################









// ##################################################### REG START ################################################################


app.post("/reg", function(req, res){

	mongoose.connect('mongodb://allUsers:135792468@ds047752.mongolab.com:47752/apartment');
	mongoose.model('myUsers', myUsersSchema);

	var db = mongoose.connection;


    console.log("\n\n------------------------------------------------------------------");
    console.log("\n\nReg Called");
    console.log("\n\nGOT POST BY : user = "+req.body.user+", pass = "+req.body.pass+", mail = "+req.body.mail+", city = "+req.body.city+", add = "+req.body.add+", amount = "+req.body.amount);
  	console.log("\n\nWaiting For Mongo DB Connection");
	

	db.once('open', function(){


 		 console.log("\n\nMongo DB Connection Received");
		
		var aUser = this.model("myUsers");


		aUser.findOne( { mail: req.body.mail}, function (err, doc){


			if(doc == null){

				var newUser = new aUser({

					mail: req.body.mail,
					user: req.body.user,
					pass: req.body.pass,
					city: req.body.city,
					address: req.body.add,
					apart: 0,
					amount: req.body.amount
			
				});

				newUser.save(function(err, docs){
    
	    			if(err){
				        res.json(err);
				    }
				    else{
				        res.json(data);
				    }

				});

	//			console.log('\n\nThe User: '+ req.body.mail+' Successfully Registered');
	//		    res.sendFile( __dirname + "/home.html");


			}else{


				console.log('\n\nFailed, This Email Is Already Exists');
				res.writeHead(200);
				res.write("Failed To Register, Email Already Exists");
				res.end();

			}
				mongoose.disconnect();


		});


	});
				db.close();



});

// ##################################################### REG END ################################################################









app.listen(port);



console.log('listening on port '+port);