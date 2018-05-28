var express = require("express")
var http = require('http')
var bodyParser = require('body-parser');
var app = express();
var csvToJson = require('convert-csv-to-json')
var model = require('./model.js')
var csv = require('csvtojson')
var csvFilePath = 'battles.csv';
var battleObj;
var locationArray = [];


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}))

app.get('/list',function(req,res){

	model.getList(function(response){
		console.log("response",response);
		res.json({"location":response.location});
	})
	
})

app.get('/count',function(req,res){
	model.getList(function(response){
		console.log("response",response);
		res.json({"count":response.count});
	})
})

app.get('/search',function(req,res){
	var param = req.param('king');
	console.log("pp",req.param('param'))
	model.getBattleList(param,function(response){
		console.log("response",response);
		res.json(response);
	})
})

var server = app.listen(3000,function(){

	console.log("app running on port ",server.address().port);
})