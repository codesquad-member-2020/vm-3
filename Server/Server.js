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

https.createServer(options, app).listen(port, function(){
    console.log(`App listening on port ${port}!`)
});