const axios = require('axios');
const fs = require('fs');
const path = require("path");
const cli = require('./src/cli');
const parser = require('./src/parser');

// Create Data https://mockaroo.com/


// 10 * 4 * 40 = 1600 
// 10 * 4 = 40 Anfragen

PAGES = 4; // 4 * 40 = 160 Products
CATEGORIES = [ // each catetory with its id
    "C0B7BBA234AEBFADAA29B23010F69288A2BA2383", // Computer Componets
    "7A187842053FDDF1AE669449DC29CBC7CE3562A7", // Computer Monitor
    "26A14AD82BA129ED1B6E3AF89F1F3F8D58AE23FC", // Computer Keyboards & Mice
    "594697AAE26E8EC6C0556DDAC59923082A665B29", // Laptops
    "C4CDBF4DECE6494C8931BB08A49CC88AD013322F", // Handy
    "33AFD022EDB3595C27D5EE7D24C0D0247B1526C6", // Audio
    "173494FB06E41709B123B8FA9A389A1B926524BA", // Drucker
    "FC3B7FDDF7610785C8009B6F00F7DD051363E70E", // Maus und Mauspad
    "74F7EB35AA02D9F4CFFB8318DC3AB1FF31BF693E", // Smart TV
    "A5CBEC538AC691D57DB949198D022004307C97D8" // Software Evtl 1 Page
];
API_KEY = "5B083B860F264BD8AACAAC3175C46C98";

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
