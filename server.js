var bodyParser = require("body-parser");
var express = require('express'); // Require Express module
var app = express();
var http = require('http').Server(app); // Http server
var mongo = require('mongoskin'); // Require mongoskin module
var ca1 = [new Buffer("LS0tLS1CRUdJTiBDRVJUSUZJQ0FURS0tLS0tCk1JSURoVENDQW0yZ0F3SUJBZ0lFV09lc0VEQU5CZ2txaGtpRzl3MEJBUTBGQURCRU1VSXdRQVlEVlFRREREbHcKYjJ4aFpHbHVaWE5vTWpBd01FQjVZV2h2Ynk1amIyMHRZMk5pTWpObFltWTVPVGxqTW1JeVlUYzNNRGswWkdGbQpOalExTnpjMU1HUXdIaGNOTVRjd05EQTNNVFV4TVRFeVdoY05NemN3TkRBM01UVXdNREF3V2pCRU1VSXdRQVlEClZRUURERGx3YjJ4aFpHbHVaWE5vTWpBd01FQjVZV2h2Ynk1amIyMHRZMk5pTWpObFltWTVPVGxqTW1JeVlUYzMKTURrMFpHRm1OalExTnpjMU1HUXdnZ0VpTUEwR0NTcUdTSWIzRFFFQkFRVUFBNElCRHdBd2dnRUtBb0lCQVFEQgowM21iQm9KUlpxSnlrcEQrZUpKYjNUN3RlTXRwWjZhclJ5VGUzbENaVWE0VkFwZTJrQmxYUnZyc0tEODY3bTAzCjlsckVOQW83bkV6Nkd3MzQvZDVDL1VKNm1jL1hZaktnOEJvQXdiRi8wVENmNkkyQm1heFRZZlZ0UmR4SjUzelgKaExyMGhIdUFjQmF3RDZNcjliNVdPdWhuZ2t4VW1QR0ZWSGRMUXZyV0wzYmNBVTdUWVE3STBVcVg3Y3ZUTjFjVQpaSjV1angyaEFJcEdBVXEzQmYxR01UMFExblRTUU1kTUpuVEFJMXVGNGhFTlVwT21wYmFCOUQ1aHRhR3JLcEkwCjZxU1prSi9xZTAxZFlKUTVaUHZKUmhJNHh2OHp6MnFpL0pMZVI5NW5LZ3dJanlZUkV5blIzakRJRzB0NE9uR1kKNXRoN2RNRlJMZnVydnhMS0hLbXJBZ01CQUFHamZ6QjlNQjBHQTFVZERnUVdCQlNxWnNjUFZPM3diVVhjRmd4SQovYUxCYVZKU0xqQU9CZ05WSFE4QkFmOEVCQU1DQWdRd0hRWURWUjBsQkJZd0ZBWUlLd1lCQlFVSEF3RUdDQ3NHCkFRVUZCd01DTUF3R0ExVWRFd1FGTUFNQkFmOHdId1lEVlIwakJCZ3dGb0FVcW1iSEQxVHQ4RzFGM0JZTVNQMmkKd1dsU1VpNHdEUVlKS29aSWh2Y05BUUVOQlFBRGdnRUJBSENmKzc4UWNlMTVsVUg0QWNieFJidWVBalVuNG1xaQorTzduUThHempqVWhjYVRINzZlS2VPekg4eFdzcEdwOEx4K05ZOHQ2eWxySGdVRGlSTG9DN3kyU3JaVGd4VnRUCkVQbFJwYjNJUHpvOFY2dWxKY2tJeTgyeGMwS3hGdUJqazRuNnJFejNsRXhNUHQ3a1JlaENuUWE4REhkNlRxNTEKZnZiUXdVMUpCNkkvekN4M1ZiR1A0WTAzVWpIdDEzQnlBdXc2cDhpNHNKSGF2MEwwcS9lelo2RGZNeVRXWERFZAplV3l1VEZKM29wK1RieHpwcEZaWHhhVG55TUQ1MW5SRTNUOUIwS0UyTWNTR1dzYkNyMy8wRUpKbHB2eFZkazRJClM2WHNwQkExN3h3TDJsYisxa2REWDRJMXUzMDVUT2xxMGFGY0NJQnJrNDRNV0lJd0o3N1JmWTA9Ci0tLS0tRU5EIENFUlRJRklDQVRFLS0tLS0K",'base64')];
var details = {
    mongos: {
        ssl: true,
        sslValidate: true,
        sslCA:ca1,
        poolSize: 1,
        reconnectTries:1
    }
};
var db = mongo.db("mongodb://admin:WGAPUKDHNENINCRK@sl-us-dal-9-portal.6.dblayer.com:22547,sl-us-dal-9-portal.7.dblayer.com:22547/admin?ssl=true",  ['inventory'], details, {native_parser:true});
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json()); // Body parser use JSON data
app.use(function(req,res,next){
    req.db = db;
    res.header('Access-Control-Allow-Origin', '*'); // We can access from anywhere
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept');
    next();
});
app.use(express.static(__dirname +'/'));

//Update existing Product
app.put('/product',function(req,res){
    var Id = req.body.id;
    var Producttype = req.body.producttype;
    var Productbrand = req.body.productbrand;
    var Productname = req.body.productname;
    var Productprice = req.body.productprice;
    var data = {
        "error":1,
        "products":""
    };
    if(!!Producttype && !!Productbrand && !!Productname && !!Productprice){
        console.log(Productbrand);
        db.collection('inventory').update({_id:mongo.helper.toObjectID(Id)}, {$set:{type:Producttype , Brand:Productbrand, Name:Productname, price:Productprice}}, function(err) {
            if(!!err){
                data["products"] = "Error Updating data";
                console.log("fgailed in node update"); 
            }else{
                data["error"] = 0;
                data["products"] = "Updated product Successfully";
                 console.log("sucess in node update");
            }
            res.json(data);
        });
    }else{
        data["products"] = "Please provide all required data (i.e : Producttype, Productbrand, Productname, Productprice)";
        res.json(data);
    }
});

//remove an existing product
app.delete('/product/:productname', function (req, res) {
  console.log('Got a delete request. with product name: '+JSON.stringify(req.body.productname));
 
    var productname = req.params.productname;
    var data = {
        "error":1,
        "products":""
    }; 
    if(!!productname){
        db.collection('inventory').remove({Name:productname}, function(err, result) {
            if(!!err){
                data["products"] = "Error deleting data";
            }else{
                data["error"] = 0;
                data["products"] = "Delete Product Successfully";
            }
            res.json(data);
            console.log('Successful delete request');
        });
    }else{
        data["products"] = "Please provide all required data (i.e : productname )";
        res.json(data);
        console.log('failed delete request');
    }
     
});

//get all the products
app.get('/product', function (req, res) {
  // res.send('Got a get request');
  console.log('Got a get request.');
  var data = {
        "Data":""
    };
    var db = req.db;
    db.collection('inventory').find().toArray(function (err, items) {
        if(items.length != 0){
            data["error"] = 0;
            data["products"] = items;
            res.json(data);
        }else{
            data["error"] = 1;
            data["products"] = 'No products found..';
            res.json(data);
        }
    });
});

// Adding new products to the inventory
app.post('/product', function (req, res) {
    // res.send("got from Post");
    var Producttype = req.body.producttype;
    var Productbrand = req.body.productbrand;
    var Productname = req.body.productname;
    var Productprice = req.body.productprice;
    var data = {
        "error":1,
        "products": ""
    };
    if(!!Producttype && !!Productbrand && !!Productname && !!Productprice){
        db.collection('inventory').insert({type:Producttype , Brand:Productbrand, Name:Productname, price:Productprice}, function(err, result) {
            if(!!err){
                data["products"] = "Error Adding data";
            }else{
                data["error"] = 0;
                data["products"] = "Product Added Successfully";
            }
            res.json(data);
        });
    }else{
        data["products"] = "Please provide all required data (i.e : Producttype, Productbrand, Productname, Productprice)";
        res.json(data);
    }

});
var port = process.env.VCAP_APP_PORT || process.env.PORT || 4000; 
var host = process.env.VCAP_APP_HOST || '0.0.0.0';
http.listen(port, function () {
  console.log('Server up and running \n listening on port 4000!')
})

