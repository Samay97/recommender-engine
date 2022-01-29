const axios = require('axios');
const fs = require('fs');
const cli = require('./src/cli');
const parser = require('./src/parser');


PAGES = 3; // 3 * 40 = 120 Products
CATEGORIES = [ // each catetory with its id
    "C538ABFBCB6E918679B8A78C3DAD66CF0C75FAF5",
    "C0B7BBA234AEBFADAA29B23010F69288A2BA2383",
    "7A187842053FDDF1AE669449DC29CBC7CE3562A7",
    "7A187842053FDDF1AE669449DC29CBC7CE3562A72",
    "7A187842053FDDF1AE669449DC29CBC7CE3562A721",
    "7A187842053FDDF1AE669449DC29CBC7CE3562A7221",
    "7A187842053FDDF1AE669449DC29CBC7CE3562A754",
    "7A187842053FDDF1AE669449DC29CBC7CE3562A7213"
];
API_KEY = "";

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
        //cat_urls.push(`https://api.bluecartapi.com/request?api_key=${API_KEY}&type=category&category_id=${category}&sort_by=best_match&page=${index}`);           
        cat_urls.push('https://raw.githubusercontent.com/nomateclabs/nomateclabs.github.io/e88ddab80c16b40a236867f5aeac94217ef1ad5b/api/feed/index.json');
        barUrls.increment();
    }
    urls.set(category, cat_urls);
});

// Create do requests for each category with all pages
urls.forEach((urls, category) => {
    requestList = [];
    urls.forEach(url=> {
        requestList.push(axios.get(url));
        barRequests.increment();
    });

    axios.all(requestList).then(axios.spread((...responses) => {
        const response = responses.map(element => element.data);
        const data = JSON.stringify(response);
        fs.writeFile(`./data_raw/${category}_products.json`, data, (err) => {
            barWrite.increment();
            walmartParser.parseFile(`./data_raw/${category}_products.json`)
        });
    })).catch(errors => {
        console.log(errors);
    });
});

// Close progessbar
barWrite.update(CATEGORIES.length);
progressbar.stop();
