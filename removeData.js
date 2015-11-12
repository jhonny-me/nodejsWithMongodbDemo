var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var ObjectId = require('mongodb').ObjectId;
var url = 'mongodb://localhost:27017/test'

MongoClient.connect(url, function(err, db){

	assert.equal(err, null);
	removeOneRestaurants(db, function(){

		db.close();
	});

});


var removeRestaurants = function(db, callback){

	db.collection('restaurants').deleteMany(

		{ "borough": "Manhattan"},
		function(err, results){

			console.log(results);
			callback();
		}
	);
};

var removeOneRestaurants = function(db, callback){

	db.collection('restaurants').deleteOne(

		{"borough": "Queens"},
		function(err, results){

			console.log(results);
			callback();
		}
	);
}

var removeAllRestaurants = function(db, callback){

	db.collection('restaurants').deleteMany({}, function(err, results){

		console.log(results);
		callback();
	});
};

var dropRestaurants = function(db, callback){

	db.collection('restaurants').drop(function(err, response){

		console.log(response);
		callback();
	});
};

