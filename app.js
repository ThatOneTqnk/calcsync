const express = require('express');
const app = express();
const PORT = process.env.PORT || 5000;
const path = require('path');
const fs = require('fs');
const bodyparser = require('body-parser')
var mjAPI = require("mathjax-node");
mjAPI.config({
  MathJax: {
    // Config will default itself.
  }
});

app.set('view engine', 'ejs');
app.use(express.static('public'))
app.use(bodyparser.urlencoded({
    extended: true
}));
app.use(bodyparser.json())


app.get('/', function(req, res) {
    res.render('pages/index')
});

app.post('/image', function(req, res) {
    //console.log(req.body);
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
    
})

app.listen(PORT, () => {
    console.log(`App started on port ${PORT}`)
})