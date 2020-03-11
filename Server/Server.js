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

const productListJSON = fs.readFileSync('productData.json', 'utf8');
const productList = JSON.parse(productListJSON);
let collectedCashArray = [0, 0, 0, 0, 0, 0, 0];
let walletCashArray = [0, 1, 5, 5, 2, 2, 1];
let collectedCash = 0;
let walletCash = 0;

https.createServer(options, app).listen(port, function(){
    console.log(`App listening on port ${port}!`)
});

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

function initializeValue() {
    collectedCashArray = [0, 0, 0, 0, 0, 0, 0];
    walletCashArray = [0, 1, 5, 5, 2, 2, 1];
    collectedCash = 0;
    walletCash = 0;
    inputNumber = 0;
}