<html>
<head></head>

<body>
<h1>Retail Inventory is an application created using <em>MEAN</em> stack.</h1>
<div>
This application is mainly useful for maintaining the inventory with some basic operations like.
<ul>
<li>Viewing the existing products in the inventory</li>
<li>Adding the new products to the inventory</li>
<li>Editing the existing product information in the inventory and</li>
<li>Removing the existing products from the Inventory</li>
</ul>
<div></div>
<h2>Aplication Usage</h2>
<div>
<p>
  Before starting the application you need to install the following softwares.
  <ol>
  <li>Node JS</li>
  <li>mongoDB</li>
  </ol>
   Download or clone the application, go to command prompt until the <em>package.json</em> level and do <pre>$ npm install</pre> which allows you to download all the dependencies. 
   Launch the mongod by following the instrucions provided in the mongoDB website, and in the command prompt at server.js level and do <pre>$ node server.js</pre> which will start the application and connects with the database.
   Open your browser and navigate to "http://localhost:4000". This is where you see the application.
</p>
</div>
<div>
</div>
<h2>Application Development</h2>
<div><p>
This application was Developed using MEAN stack.
<ul>
<li><strong>M</strong>ongoDB</li>
<li><strong>E</strong>xpressJS</li>
<li><strong>A</strong>ngularJS</li>
<li><strong>N</strong>odejs</li>
</ul>
   Used MongoDB for data layer which holds the products and their information, NodeJS and ExpressJS for Service layer which is used to serve the requests from the client and used AngularJS for Presentation layer.
   NPM(Node Package Manager) is used to maintain the dependencies for the application. In the application the dependencies required for integrating mongoDB to NodeJS and Supporting Node Server are Express, Drivers for Mongodb(mongodb, mongoskin), body-parser.
</p>
<p>
This application was pushed to BlueMix and can be accessed at <a href="https://retailinventory-unspeculatory-btry.mybluemix.net/#/">Retail Inventory</a>
</p>
</div>
</body>
</html>
