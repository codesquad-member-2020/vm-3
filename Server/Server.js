const port = 8090;
const express = require('express');
const cors = require('cors');
const app = express();
const fs = require('fs');
const https = require('https');

const options = {
	key: fs.readFileSync('./dev-angelo.dlinkddns.com-key.pem'),
	cert: fs.readFileSync('./dev-angelo.dlinkddns.com-crt.pem')
};

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: false}));

const priceTypeCount = 7;
const productListJSON = fs.readFileSync('productData.json', 'utf8');
const productList = JSON.parse(productListJSON);
let collectedCashArray = [0, 0, 0, 0, 0, 0, 0];
let walletCashArray = [0, 1, 5, 5, 2, 2, 1];
let collectedCash = 0;
let walletCash = 0;
let inputNumber = 0;

app.get('/get/initial-data', (req, res) => {
    initializeValue();
    const initializeData = {};

    initializeData.collectedCash = collectedCash;
    initializeData.walletCash = walletCash;
    initializeData.walletCashArray = walletCashArray;
    initializeData.productList = productList;
    initializeData.message = ["자판기 구동이 시작되었습니다."];
    
    res.send(initializeData)
});

app.patch('/patch/product-button-click', (req, res) => {
    const selectedItemIndex = req.body.index - 1;
    const selectedItemPrice = productList[selectedItemIndex].price;
    const selectedItemName = productList[selectedItemIndex].name;
    const productButtonClickResponse = {};

    if (selectedItemPrice > collectedCash) {
        productButtonClickResponse.message = ["투입된 금액이 부족합니다."]
    }
    else {
        productButtonClickResponse.message = [`${selectedItemName} 이 판매되었습니다`];

        collectedCash = collectedCash - selectedItemPrice;
        collectedCashArray = makeCollectedCashArray(collectedCash);

        productButtonClickResponse.collectedCash = collectedCash;
    }

    res.send(productButtonClickResponse);
});

app.patch('/patch/numberButtonClick', (req, res) => {
    const numberButtonClickResponse = {};

    inputNumber = (inputNumber % 10) * 10 + req.body.number;

    numberButtonClickResponse.message = [];
    numberButtonClickResponse.message.push(`${req.body.number} 가 입력되었습니다`)
    numberButtonClickResponse.message.push(`현재 입력된 번호는 ${inputNumber} 입니다`);

    res.send(numberButtonClickResponse);
});

function initializeValue() {
    collectedCashArray = [0, 0, 0, 0, 0, 0, 0];
    walletCashArray = [0, 1, 5, 5, 2, 2, 1];
    collectedCash = 0;
    walletCash = 0;
    inputNumber = 0;
}

function makeCollectedCashArray(collectedCash) {
    const collectedCashArray = [];

    for (let index = 0 ; index < priceTypeCount ; ++index) {
        collectedCashArray.push(0);
    }

    collectedCashArray[6] = collectedCash / 10000;
    collectedCashArray[5] = (collectedCash % 10000) / 5000;
    collectedCashArray[4] = ((collectedCash % 10000) % 5000) / 1000;
    collectedCashArray[3] = (((collectedCash % 10000) % 5000) % 1000) / 500;
    collectedCashArray[2] = ((((collectedCash % 10000) % 5000) % 1000 ) % 500) / 100;
    collectedCashArray[1] = (((((collectedCash % 10000) % 5000) % 1000 ) % 500) % 100) / 50;
    collectedCashArray[0] = ((((((collectedCash % 10000) % 5000) % 1000 ) % 500) % 100) % 50) / 10;

    return collectedCashArray;
}

https.createServer(options, app).listen(port, function(){
    console.log(`App listening on port ${port}!`)
});