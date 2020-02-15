var MongoClient = require('mongodb').MongoClient;
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
    }
}