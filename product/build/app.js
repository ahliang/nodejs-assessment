"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
// lib/app.ts
var express = require("express");
var bodyParser = require("body-parser");
var cors = require('cors');
var url = require('url');
// Create a new express application instance
var app = express();
app.use(cors());
app.use(bodyParser.json());
// Should retrieve from database
var sampleProducts = [];
for (var counter = 65; counter <= 90; counter++) {
    sampleProducts[(counter - 65)] = {
        id: counter,
        name: String.fromCharCode(counter) + " Product",
        brand: String.fromCharCode(counter) + " Brand",
        upc12Barcode: counter
    };
}
app.get('/grocery', function (req, res) {
    try {
        var searchResponse = {
            payload: sampleProducts,
            totalCount: sampleProducts.length,
            errorCode: ''
        };
        var queryParams = url.parse(req.url, true).query;
        var brandToFilter_1 = queryParams.brand || '';
        var nameToFilter_1 = queryParams.name || '';
        searchResponse.payload = sampleProducts.filter(function (product) {
            return (product.brand.includes(brandToFilter_1) &&
                product.name.includes(nameToFilter_1));
        });
        searchResponse.totalCount = searchResponse.payload.length;
        res.send(JSON.stringify(searchResponse));
    }
    catch (ex) {
        console.log('An error has occurred when searching grocery: ', ex);
        var searchResponse = {
            payload: [],
            totalCount: 0,
            errorCode: "01001" /* UNEXPECTED_ERROR */
        };
        res.status(500);
        res.end(JSON.stringify(searchResponse));
    }
});
app.get('/grocery/:id', function (req, res) {
    try {
        var getByIdResponse = {
            product: sampleProducts.find(function (product) {
                return product.id == Number(req.params.id);
            }),
            errorCode: ''
        };
        res.send(JSON.stringify(getByIdResponse));
    }
    catch (ex) {
        console.log('An error has occurred when getting product by ID: ', ex);
        var getByIdResponse = {
            errorCode: "01001" /* UNEXPECTED_ERROR */
        };
        res.status(500);
        res.end(JSON.stringify(getByIdResponse));
    }
});
app.put('/grocery/:id', function (req, res) {
    try {
        var productId_1 = Number(req.params.id);
        var index = sampleProducts.findIndex(function (product) { return product.id === productId_1; });
        if (index < 0) {
            var getByIdResponse = {
                errorCode: "01002" /* UPDATE_FAILED */
            };
            res.status(500);
            res.end(JSON.stringify(getByIdResponse));
        }
        else {
            sampleProducts[index] = __assign(__assign({}, req.body), { id: productId_1 });
            var getByIdResponse = {
                product: sampleProducts[index],
                errorCode: ''
            };
            res.send(JSON.stringify(getByIdResponse));
        }
    }
    catch (ex) {
        console.log('An error has occurred when updating product: ', ex);
        var getByIdResponse = {
            errorCode: "01001" /* UNEXPECTED_ERROR */
        };
        res.status(500);
        res.end(JSON.stringify(getByIdResponse));
    }
});
app.listen(3000, function () {
    console.log('Example app listening on port 3000!');
});
