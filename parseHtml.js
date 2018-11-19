var express = require("express");
var bodyParser = require("body-parser");
var app = express();
app.use(express.static("public"));
app.use(express.static("node_modules"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.post("/any-url", function(req, res) {
  const url = require("url");
  var http = require("http");
  var http = require("https");
  var options = url.parse(req.body.url);
  console.log(options);
  if (options.protocol === null) {
    console.log("error");
    res.send({ error: "Invalid Url" });
    throw new Error("Invalid Url");
  }
  http.get(options, function(http_res) {
      // initialize the container for our data
      var data = "";
      // this event fires many times, each time collecting another piece of the response
      http_res.on("data", function(chunk) {
        // append this chunk to our growing `data` var
        data += chunk;
      });
      // this event fires *one* time, after all the `data` events/chunks have been gathered
      http_res.on("end", function() {
        // you can use res.send instead of console.log to output via express
        console.log(http_res.statusCode);
        let h1 = data.split("</h1>")[data.split("</h1>").length - 2];
        h1 = h1.split("<h1")[1];
        h1 = h1.split(">")[h1.split(">").length - 1];
        console.log("last H1 = " + h1);
        res.send({ lastH1: h1 });
      });
    }).on("error", function(e) {
      console.log("Got error: " + e.message);
      if (options.protocol === null) {
        res.send({ error: "Invalide Url" });
        throw new Error("Invalid Url");
      }
    });
});

app.listen(3000, function() {
  console.log("Listening on port 3000!");
});
