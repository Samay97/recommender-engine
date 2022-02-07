const axios = require('axios');
const fs = require('fs');
const path = require("path");
const cli = require('./src/cli');
const parser = require('./src/parser');

// Create Data https://mockaroo.com/


PAGES = 3; // 3 * 40 = 120 Products
CATEGORIES = [ // each catetory with its id
    "7A187842053FDDF1AE669449DC29CBC7CE3562A7",
    "02842EC267E94A40F50D43C6448E20AF601EE05C"
];
API_KEY = "792BE02354AF42498DE176B79285F83D";

urls = new Map();

// Parser Setup
const walmartParser = new parser.WalmartParser();

// Progressbar setup
const progressbar = new cli.ProgressBar();
const barUrls = progressbar.createbar(PAGES*CATEGORIES.length, 'Create Urls');
const barRequests = progressbar.createbar(PAGES*CATEGORIES.length, 'Create Req.');
const barWrite = progressbar.createbar(CATEGORIES.length, 'Write data');
const barParsing= progressbar.createbar(CATEGORIES.length, 'Parse data');

walmartParser.setProgressBar(barParsing);


// Create all urls
CATEGORIES.forEach(category => {
    cat_urls = []
    for (let index = 1; index < PAGES + 1; index++) {    
        cat_urls.push(`https://api.bluecartapi.com/request?api_key=${API_KEY}&type=category&category_id=${category}&sort_by=best_match&page=${index}`);
        barUrls.increment();
    }
    urls.set(category, cat_urls);
});

// Create do requests for each category with all pages
let index = 0;
urls.forEach((_urls, category) => {
    requestList = [];

    _urls.forEach(url=> {
        requestList.push(axios.get(url));
        barRequests.increment();
    });

    axios.all(requestList).then(axios.spread((...responses) => {
        const response = responses.map(element => element.data);
        const data = JSON.stringify(response);
        fs.writeFile(`./data_raw/${category}_products.json`, data, (err) => {
            barWrite.increment();
            const absolutePath = path.resolve(`./data_raw/${category}_products.json`);
            walmartParser.parseFile(absolutePath, category).then(() => {
                if (index === urls.size) {
                    progressbar.stop();
                }
            }); 
        });
    })).catch(errors => {
        console.log(errors);
    });

    index++;
});
