const express = require('express');
const app = express();
const PORT = process.env.PORT || 5000;
const path = require('path');
const fs = require('fs');
const bodyparser = require('body-parser');
const request = require('request');
let config;
try {
    config = require('./config.json');
} catch(e) {
    console.log(e);
}
var FormData = require('form-data');
var mjAPI = require("mathjax-node");
mjAPI.config({
  MathJax: {
    // Config will default itself.
  }
});

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(bodyparser.urlencoded({
    extended: true
}));
app.use(bodyparser.json());


app.get('/', function(req, res) {
    res.render('pages/index');
});

// app.get('/learn', (req, res) => {
//     res.render('pages/learn');
// })

app.post('/image', function(req, res) {
    mjAPI.start();
    var intosvg = req.body.image;
    mjAPI.typeset({
      math: intosvg,
      format: "TeX",
      svg: true,
    }, (data) => {
        if (!data.errors) {
            //console.log(data.svg)
            res.send({zuccess: 1, img: data.svg});
        } else {
            res.send({zuccess: 0, img: data.svg});
        }
    });
    
});

app.post('/imgapi', (req, res) => {
    let innerContent = req.body;
    var form = new FormData();
    if(innerContent.width >= 1100) {
        res.send({zuccerror: 2});
        return;
    }
    if(innerContent.height >= 340) {
        res.send({zuccerror: 1});
        return;
    }
    var formData = {
        image: innerContent.interimg,
        type: "base64"
    };
    console.log(form);
    request.post({
        async: true,
        crossDomain: true,
        url: "https://api.imgur.com/3/image",
        method: "POST",
        headers: {
            Authorization: `Client-ID ${process.env.imgurid || config.imgurid}`
        },
        processData: false,
        contentType: false,
        mimeType: "multipart/form-data",
        formData: formData
    }, (err, resp, body) => {
        if(err) console.log(err);
        console.log('upload was successful, body res: ' + body);
        let realdata = JSON.parse(body);
        res.send(realdata.data.link);
    });
});

app.listen(PORT, () => {
    console.log(`App started on port ${PORT}`);
});