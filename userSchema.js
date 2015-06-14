
var mongoose = require('mongoose');
var schema = mongoose.Schema;



var myUsersSchema = new schema({

		mail: {type:String, index:1, required:true, unique:true}, // index == that this row will be reveived faster, and the 1 == "true"	
		user: {type:String, index:1, required:true},
		pass: {type:String, required:true},			
		city: {type:String, required:true},
		address: {type:String, required:true},
		apart: {type:Number, required:true},
		amount: {type:Number, required:true}

}, {collection:"myUsers"}); // , { _id : false });



exports.myUsersSchema = myUsersSchema;


