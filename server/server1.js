var app   = require('express')(); // Require Express module
var http = require('http').Server(app); // Http server
var bodyParser = require("body-parser"); // Require Body parser module
var mongo = require('mongoskin'); // Require mongoskin module
var db = mongo.db("mongodb://localhost:27017/retail", {native_parser:true}); // Connection MongoDB book collection DB
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json()); // Body parser use JSON data
app.use(function(req,res,next){
    req.db = db;
    res.header('Access-Control-Allow-Origin', '*'); // We can access from anywhere
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept');
    next();
});

http.listen(4000, function () {
  console.log('up and running \n listening on port 3000!')
})


// get the book list
app.get('/product', function (req, res) {
  // res.send('Got a get request');
  console.log('Got a get request');
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


// Add new book to the collection
app.post('/product',function(req,res){
    var Bookname = req.body.producttype;
    res.send(req.body);
    console.log("From Post");
    // var Authorname = req.body.authorname;
    // var Price = req.body.price;
    // var data = {
    //     "error":1,
    //     "Books":""
    // };
    // if(!!Bookname && !!Authorname && !!Price){
    //     db.collection('books').insert({bookname:Bookname , authorname: Authorname, price:Price}, function(err, result) {
    //         if(!!err){
    //             data["Books"] = "Error Adding data";
    //         }else{
    //             data["error"] = 0;
    //             data["Books"] = "Book Added Successfully";
    //         }
    //         res.json(data);
    //     });
    // }else{
    //     data["Books"] = "Please provide all required data (i.e : Bookname, Authorname, Price)";
    //     res.json(data);
    // }
});

// //Update existing book
// app.put('/book',function(req,res){
//     var Id = req.body.id;
//     var Bookname = req.body.bookname;
//     var Authorname = req.body.authorname;
//     var Price = req.body.price;
//     var data = {
//         "error":1,
//         "Books":""
//     };
//     if(!!Bookname && !!Authorname && !!Price){
//         db.collection('books').update({_id:mongo.helper.toObjectID(Id)}, {$set:{bookname:Bookname,authorname:Authorname,price:Price}}, function(err) {
//             if(!!err){
//                 data["Books"] = "Error Updating data";
//                 console.log("second");
//             }else{
//                 data["error"] = 0;
//                 data["Books"] = "Updated Book Successfully";
//             }
//             res.json(data);
//         });
//     }else{
//         data["Books"] = "Please provide all required data (i.e : Bookname, Authorname, Price)";
//         res.json(data);
//     }
// });

// //Delete existing book
// app.delete('/book/:bookname',function(req,res){
//     var BookName = req.params.bookname;
//     var data = {
//         "error":1,
//         "Books":""
//     };
//     if(!!BookName){
//         db.collection('books').remove({bookname:BookName}, function(err, result) {
//             if(!!err){
//                 data["Books"] = "Error deleting data";
//             }else{
//                 data["error"] = 0;
//                 data["Books"] = "Delete Book Successfully";
//             }
//             res.json(data);
//         });
//     }else{
//         data["Books"] = "Please provide all required data (i.e : bookname )";
//         res.json(data);
//     }
// });