var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var ObjectId = require('mongodb').ObjectId;
var url = 'mongodb://localhost:27017/test'

MongoClient.connect(url, function(err, db){

	assert.equal(err, null);
	matchRestaurants(db, function(){

		db.close();
	});

});

var aggregationRestaurants = function(db, callback){

	db.collection('restaurants').aggregate(
		[
			{ $group: { "_id": "$borough", "count":{$sum: 1}}}
		]
	).toArray(function(err, results){

		assert.equal(err, null);
		console.log(results);
		callback(results);
	});
};

var matchRestaurants = function(db, callback){

	db.collection('restaurants').aggregate(

		[
			{ $match: { "borough": "Queens", "cuisine": "Brazilian"}},
			{ $group: { "_id": "$address.zipcode", "count": {$sum: 1}}}
	]).toArray(function(err, results){

		assert.equal(err, null);
		console.log(results);
		callback();
	});
};