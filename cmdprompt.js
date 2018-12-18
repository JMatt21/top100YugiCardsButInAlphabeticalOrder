// Using this template, the cheerio documentation,
// and what you've learned in class so far, scrape a website
// of your choice, save information from the page in a result array, and log it to the console.

var cheerio = require("cheerio");
var request = require("request");

// Make a request call to grab the HTML body from the site of your choice
request("https://yugiohprices.com/top_100?rarity=common&meta_relevant=true", function (error, response, html) {
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
  console.log(results);

});
