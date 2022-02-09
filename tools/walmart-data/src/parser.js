const fs = require('fs');
const { resolve } = require('path');
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

    async parseFile(_path, category) {
        let data;
        try {
            const rawdata = fs.readFileSync(_path);
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
                    const new_products = this.parseOneRequest(element, category);
                    products = [...products, ...new_products];
                } catch (error) {
                    console.error(error);
                }
            });
            return this.writeNewProducts('./data_parsed', category, { ...products })
        } else {
            console.error('Error in data.length, seems empty');
        }
    }

    parseOneRequest(data, category) {
        if (!data.category_results) 
            throw Error(`category_results not there or empty: ${data.request_parameters.type} : ${data.request_parameters.category_id}`);

    
        const new_result = data.category_results.map(element => {
            const product = element.product;

            return {
                name: product.title,
                description: product.description,
                images: product.images,
                mainImage: product.main_image,
                rating: product.rating,
                ratingsTotal: this._clampValueWithRandom(product.ratings_total),
                price: this._dollar_in_euro(element.offers.primary.price),
                bestSeller: product.best_seller ? true : false,
                category: category
            };
        });

        return new_result;
    }

    writeNewProducts(rootPath, category, products) {
        return new Promise((resolve) => {
            const data = JSON.stringify(products, null, 2);
            const filePath = path.join(rootPath, `${category}.json`);
            fs.writeFile(filePath, data, (err) => {
                if (err) throw err;
                if(this.bar) this.bar.increment();
                resolve();
            });
        });        
    }

}

exports.WalmartParser = WalmartParser;
