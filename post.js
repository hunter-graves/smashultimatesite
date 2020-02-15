var MongoClient = require('mongodb').MongoClient;
var ObjectID = require('mongodb').ObjectID;
var assert = require('assert');
var url = 'mongodb://localhost';
 
module.exports = {
    addPost: function(title, subject, callback){
        MongoClient.connect(url, function(err, client) {
            var db = client.db('smashsite');
            db.collection('post').insertOne( {
                "title": title,
                "subject": subject
            },function(err, result){
                assert.equal(err, null);
                console.log("Saved the blog post details.");
                if(err == null){
                    callback(true)
                }
                else{
                    callback(false)
                }
            });
        });
    },

    getPost: function(callback){
        MongoClient.connect(url, function(err, client){
            var db = client.db('smashsite');
             db.collection('post', function (err, collection) {
                collection.find().toArray(function (err, list) {
                    callback(list);
                });
             });
        })
    },

    updatePost: function(id, title, subject, callback){
        MongoClient.connect(url, function(err, client) {
            var db = client.db('smashsite');
            db.collection('post').updateOne( 
                { "_id": new ObjectID(id) },
                { $set: 
                    { "title" : title,
                      "subject" : subject 
                    }
                },function(err, result){
                assert.equal(err, null);
                if(err == null){
                    callback(true)
                }
                else{
                    callback(false)
                }
            });
        });
    },

    deletePost: function(id, callback){
 
        MongoClient.connect(url, function(err, client){
            var db = client.db('smashsite');
             db.collection('post').deleteOne({
                _id: new ObjectID(id)
             },
             function(err, result){
                assert.equal(err, null);
                console.log("Deleted the post.");
                if(err == null){
                    callback(true)
                }
                else{
                    callback(false)
                }
            });
        })
    }



    
}