const fs = require('fs');
const path = require('path');
const seedrandom = require('seedrandom');
const randomGenerator = seedrandom('randomseed123456789');


class WalmartParser {

    bar = null;

    _dollar_in_euro(dollar) {
        // 1 dollar == 0,9 Euro
        return +(Math.round((dollar * 0.9) + "e+2")  + "e-2");
    }

    _clampValueWithRandom(value, maxValue = 31) {
        return value > maxValue ? Math.floor(randomGenerator() * maxValue) + 1 : value;
    }

    setProgressBar(bar) {
        this.bar = bar;
    }

    parseFile(_path) {
        let data;
        try {
            const rawdata = fs.readFileSync('C:\\repos\\recommender-engine\\tools\\walmart-data\\data_parsed\\test\\7A187842053FDDF1AE669449DC29CBC7CE3562A7_products.json');
            data = JSON.parse(rawdata);
        } catch (error) {
            console.log('Error in Parsing file');
            console.error(error);
            return;
        }    
        
        if (data && data.length) {
            let products = [];
            data.forEach(element => {
                try {
                    const new_products = this.parseOneRequest(element);
                    products = [...products, ...new_products];
                } catch (error) {
                    console.error(error);
                }
            });
            this.writeNewProducts('./data_parsed', '7A187842053FDDF1AE669449DC29CBC7CE3562A7', { ...products })
        } else {
            console.error('Error in data.length, seems empty');
        }
    }

    parseOneRequest(data) {
        if (!data.category_results) 
            throw Error(`category_results not there or empty: ${data.request_parameters.type} : ${data.request_parameters.category_id}`);

    
        const new_result = data.category_results.map(element => {
            const product = element.product;
            return {
                name: product.title,
                description: product.description,
                images: product.images,
                main_image: product.main_image,
                rating: product.rating,
                ratings_total: this._clampValueWithRandom(product.ratings_total),
                price: this._dollar_in_euro(element.offers.primary.price)
            };
        });

        return new_result;
    }

    writeNewProducts(rootPath, category, products) {
        const data = JSON.stringify(products, null, 2);
        const filePath = path.join(rootPath, `${category}.json`);
        fs.writeFile(filePath, data, (err) => {
            if (err) throw err;
            if(this.bar) this.bar.increment();
        });
    }

}

exports.WalmartParser = WalmartParser;
