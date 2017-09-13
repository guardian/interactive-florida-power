import cheerio from 'cheerio'
import fs from 'fs'
import maptemplate from './src/templates/floridacounties.html!text'
import rp from 'request-promise'

function twodecimals(input) {
    return Math.round(input * 10) / 10;
}


function cleannumber(input) {
    if (typeof input == "string") {
        input = input.replace(/,/g, "");
        return parseFloat(input);
    }
    if (typeof input == "number") {
        return input;
    }
}

export default async function prepmaps(seats,wk_names) {
    var sheetsr = await rp('https://interactive.guim.co.uk/docsdata-test/1zLitRhnUyE6S3wF8v9EUXwHzt0DP5v_tPJ2XnUp9lZg.json');
    var sheets = JSON.parse(sheetsr);
    var data = sheets.sheets.Sheet1;
    var $ = cheerio.load(maptemplate);
    var counties = Array.from($('path'));
    // Add data
    counties.forEach(function (c) {
        var match = data.find(function (n) { return n.County == $(c).attr('id') });
        if (match != undefined) {
            var band = Math.floor(cleannumber(match.Sep12) / 20);
            $(c).attr('data-sep12', band)
        }
    });
    counties.forEach(function (c) {
        var match = data.find(function (n) { return n.County == $(c).attr('id') });
        if (match != undefined) {
            var band = Math.floor(cleannumber(match.Sep10) / 20);
            $(c).attr('data-sep10', band)
        }
    });
    counties.forEach(function (c) {
        var match = data.find(function (n) { return n.County == $(c).attr('id') });
        if (match != undefined) {
            var band = Math.floor(cleannumber(match.Sep11) / 20);
            $(c).attr('data-sep11', band)
        }
    });    counties.forEach(function (c) {
        var match = data.find(function (n) { return n.County == $(c).attr('id') });
        if (match != undefined) {
            var band = Math.floor(cleannumber(match.Sep13) / 20);
            $(c).attr('data-sep13', band)
        }
    });
    fs.writeFileSync("./.build/resultsmap.html", $.html())
    return $.html();
}
