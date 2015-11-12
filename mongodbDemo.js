var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var ObjectId = require('mongodb').ObjectID;
var url = 'mongodb://localhost:27017/restaurants';

MongoClient.connect(url, function(err, db){

	assert.equal(null, err);
	findSortRestaurants(db, function(){

		db.close();
	});
});

var insertDocument = function(db, callback){

	db.collection('restaurants').insertOne({

		"address" : {
         "street" : "2 Avenue",
         "zipcode" : "10075",
         "building" : "1480",
         "coord" : [ -73.9557413, 40.7720266 ]
      	},
      	"borough" : "Manhattan",
     	"cuisine" : "Italian",
      	"grades" : [
         {
            "date" : new Date("2014-10-01T00:00:00Z"),
            "grade" : "A",
            "score" : 11
         },
         {
            "date" : new Date("2014-01-16T00:00:00Z"),
            "grade" : "B",
            "score" : 17
         }
      	],
      	"name" : "Vella",
      	"restaurant_id" : "41704620"
      }, function(err, result){

      	assert.equal(err, null);
      	console.log("Inserted a document into the restaurants collection");
      	callback(result);
      });
};


var findAllRestaurants = function(db, callback){

	var cursor = db.collection('restaurants').find();
	cursor.each(function(err, doc){

		assert.equal(err, null);
		if (doc != null) {
			console.dir(doc);
		}else {

			callback();
		}
	});
};

var findSpecifiedRestaurants = function(db, callback){

   var cursor = db.collection('restaurants').find( {"borough": "Manhattan"});
   cursor.each(function(err, doc){

      assert.equal(err, null);
      if (doc != null) {

         console.dir(doc);
      }else {

         callback();
      }
   });
};

var findEmbeddedRestaurants = function(db, callback){

   var cursor = db.collection('restaurants').find( { "address.zipcode": "10075"});
   cursor.each(function(err, doc){

      assert.equal(err, null);
      if (doc != null) {

         console.dir(doc);
      }else {

         callback();
      }
   });
};

var findArrayRestaurants = function(db, callback){

   var cursor = db.collection('restaurants').find({"grades.grade": "B"});
   cursor.each(function(err, doc){

      assert.equal(err, null);

      if (doc != null) {

         console.dir(doc);
      }else {

         callback();
      }
   });
}

var findGTRestaurants = function(db, callback){

   var cursor = db.collection('restaurants').find( { "grades.score": { $lt: 30}});
   cursor.each(function(err, doc){

      assert.equal(err, null);
      if (doc != null) {

         console.dir(doc);
      }else {

         callback();
      }
   });
};

var findAndRestaurants = function(db, callback){

   var cursor = db.collection('restaurants').find( 
      {"grades.grade" : "B", "grades.score": {$lt: 30}
   });

   cursor.each(function(err, doc){

      assert.equal(err, null);
      if (doc != null) {

         console.dir(doc);
      }else {

         callback();
      }
   });
};

var findOrRestaurants = function(db, callback){

   var cursor = db.collection('restaurants').find(
      {$or: [{ "grades.grade": "B"}, {"grades.score": {$gt: 30}}]}
   );
   cursor.each(function(err, doc){

      assert.equal(err, null);
      if (doc != null) {

         console.dir(doc);
      }else {

         callback();
      }
   });
};

var findSortRestaurants = function(db, callback){

   var cursor = db.collection('restaurants').find().sort(
      { "borough": 1, "address.zipcode": -1}
   );
   cursor.each(function(err,doc){
      assert.equal(err, null);
      if (doc != null) {
         console.dir(doc);
      }else{
         callback();
      }
   });
};