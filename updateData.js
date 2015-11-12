var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var ObjectId = require('mongodb').ObjectId;
var url = 'mongodb://localhost:27017/test'

MongoClient.connect(url, function(err, db){

	assert.equal(err, null);

	replaceRestaurants(db, function(){

		db.close();
	})
});

var findAll = function(db, callback){

	var cursor = db.collection('restaurants').find();
	cursor.each(function(err, doc){

		assert.equal(err, null);
		if (doc !=null) {

			console.dir(doc);
		}else {

			callback();
		}
	});
}

var updateRestaurants = function(db, callback){

	db.collection('restaurants').updateOne(
		{ "name": "Juni"},
		{
			$set: { "cuisine": "American (New)"},
			$currentDate : { "lastModified": true}
		},function(err, results) {
			console.log(results);
			callback();
		}
	);
};

var updateMultipleRestaurants = function(db, callback){

	db.collection('restaurants').updateMany(

		{ "address.zipcode": "10016", cuisine: "Other"},
		{
			$set: { cuisine: "Category To Be Determined"},
			$currentDate: {"lastModified": true}
		},function(err, results){
			console.log(results);
			callback();
		}
	);
};

var replaceRestaurants = function(db, callback){

	db.collection('restaurants').replaceOne(
		{ "restaurant_id": "41704620"},
		{
			"name" : "Vella 2",
			"address" :{

				"coord": [-73.9557413, 40.7720266],
				"building" : "1480",
				"street" : "2 Avenue",
				"zipcode" : "10075"
			},
		},function(err, results){

			console.log(results);
			callback();
		}
	);
};