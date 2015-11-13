var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var ObjectId = require('mongodb').ObjectId;
var url = 'mongodb://localhost:27017/test'

/*
index 为MongoDB中的Query提供了高效的执行。没有index，mongoDB在执行查询语句的时候需要对整个collection进行扫描，
比如说扫描collection中的每一个document，从而选择出那些与查询条件匹配的document。而如果查询的时候存在一个合适的index，
MongoDB就可以使用index来限制需要检索的document数量.

index 是一种特殊的数据结构，它将collection中的数据集以一种更加方便查找的方式存储起来。index按照某个特定field或者是
feild的集合的值来进行排序存储。排序好的index支持高效的匹配和范围查询。另外，MongoDB使用index中的排序可以返回有序的结果。
 */

MongoClient.connect(url, function(err, db){

	assert.equal(err, null);
	compoundIndexRestaurants(db, function(){

		db.close();
	});

});


var indexRestaurants = function(db, callback){

	db.collection('restaurants').createIndex(
		{ "cuisine": 1},
		null,
		function(err, results){

			console.log(results);
			callback();
		}
	);
};

var compoundIndexRestaurants = function(db, callback){

	db.collection('restaurants').createIndex(
		{ "cuisine": 1, "address.zipcode": -1},
		null,
		function(err, results){

			console.log(results);
			callback();
		}
	);
};