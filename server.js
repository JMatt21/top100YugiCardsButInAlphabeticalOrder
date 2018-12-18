// Dependencies
var express = require("express");
var path = require("path");
var cheerio = require("cheerio");
var bodyParser = require("body-parser");
var request = require("request");
// Create express app instance.
var app = express();

// Set the port of our application
// process.env.PORT lets the port be set by Heroku
var PORT = process.env.PORT || 8080;

// Sets up the Express app to handle data parsing

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));
// parse application/json
app.use(bodyParser.json());
// allows us to use the 'public' folder from the front end
app.use(express.static("public"));

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "./public/index.html"));
});

app.get("/cards/:rarity", (req, res) => {
    request(`https://yugiohprices.com/top_100?rarity=${req.params.rarity}&meta_relevant=true`, function (error, response, html) {
        if (error) {
            console.log(error);
        }

        var $ = cheerio.load(html);
        var results = [];
        $("tr.content").each(function (i, element) {

            const titleAndPrice = $(element).children('td').children('p').children('b').text().split("\n");
            const set = $(element).children('td').children('p').children('a').text().replace(/\n/gi, '');
            const title = titleAndPrice[1];
            const price = titleAndPrice[2];

            results.push({
                title: title,
                // set: test,
                price: price
            });
        });

        results.sort(function (a, b) {
            const titleA = a.title.toLowerCase(), titleB = b.title.toLowerCase()
            if (titleA < titleB) { return -1; }
            if (titleA > titleB) { return 1; }
            return 0;
        });
        res.json(results)
    });
});

// Start our server so that it can begin listening to client requests.
app.listen(PORT, function () {
        // Log (server-side) when our server has started
        console.log("Server listening on: http://localhost:" + PORT);
    });
