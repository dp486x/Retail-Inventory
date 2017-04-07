var bodyParser = require("body-parser");
var express = require('express'); // Require Express module
var app = express();
var http = require('http').Server(app); // Http server
var mongo = require('mongoskin'); // Require mongoskin module
var db = mongo.db("mongodb://admin:WGAPUKDHNENINCRK@sl-us-dal-9-portal.6.dblayer.com:22547,sl-us-dal-9-portal.7.dblayer.com:22547/admin?ssl=true", {native_parser:true});
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

