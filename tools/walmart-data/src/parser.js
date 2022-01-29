
class WalmartParser {

    bar = null;

    setProgressBar(bar) {
        this.bar = bar;
    }

    parseFile(path) {
        const rawdata = fs.readFileSync('C:\\repos\\recommender-engine\\tools\\walmart-data\\data_parsed\\7A187842053FDDF1AE669449DC29CBC7CE3562A7_products.json');
        const data = JSON.parse(rawdata);

        console.log(data);
    }

}

exports.WalmartParser = WalmartParser;
