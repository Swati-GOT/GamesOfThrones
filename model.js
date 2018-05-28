var csvToJson = require('convert-csv-to-json')
var csv = require('csvtojson')
var csvFilePath = 'battles.csv';
var battleObj;
var locationArray = [];
var db,collection;

var MongoClient = require('mongodb').MongoClient
var URL = 'mongodb://temp:12345@ds135760.mlab.com:35760/gamesofthrones'


csv().fromFile(csvFilePath).then((jsonObj)=>{
	battleObj = jsonObj
})

MongoClient.connect(URL,function(err,client){
	if(err){
		console.log("err",err)
	}else{
		db = client.db('gamesofthrones');
		collection = db.collection('GamesOfThrones')
		collection.insert(battleObj,function(err,result){
		})
	}

})


module.exports ={

	getList:function(next){

		collection.find().toArray(function(err,docs){
			console.log(docs)
			for(var i=0; i<docs.length;i++){
				locationArray.push(docs[i].location)
			}
			next({"location":locationArray,"count":docs.length})
		})

	},

	getBattleList:function(params,next){
		collection.find({"$or": [{
	        "attacker_king": params
	    }, {
	        "defender_king": params
	    }]}).toArray(function(err,docs){
				console.log("docs",docs);
				next({"record":docs});
		})

	}
}

