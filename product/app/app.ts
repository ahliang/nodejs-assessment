// lib/app.ts
import express = require('express');
import { Grocery, GrocerySearchResponse, GroceryGetByIdResponse, GroceryUpdateResponse } from './models/grocery';
import { ErrorCode } from './enums/error-code';
import bodyParser = require('body-parser');
const cors = require('cors');
const url = require('url')

// Create a new express application instance
const app: express.Application = express();
app.use(cors());
app.use(bodyParser.json());

// Should retrieve from database
const sampleProducts: Array<Grocery> = [];

for (let counter = 65; counter <= 90; counter++) {
  sampleProducts[(counter - 65)] = {
    id: counter,
    name: `${String.fromCharCode(counter)} Product`,
    brand: `${String.fromCharCode(counter)} Brand`,
    upc12Barcode: counter
  }
}

app.get('/grocery', function (req, res) {
  try {
    const searchResponse: GrocerySearchResponse = {
      payload: sampleProducts,
      totalCount: sampleProducts.length,
      errorCode: ''
    }

    const queryParams = url.parse(req.url, true).query;
    const brandToFilter = queryParams.brand || '';
    const nameToFilter = queryParams.name || '';

    searchResponse.payload = sampleProducts.filter(product => {
      return (
        product.brand.includes(brandToFilter) &&
        product.name.includes(nameToFilter)
      );
    });

    searchResponse.totalCount = searchResponse.payload.length
    res.send(JSON.stringify(searchResponse));
  }
  catch (ex) {
    console.log('An error has occurred when searching grocery: ', ex);
    const searchResponse: GrocerySearchResponse = {
      payload: [],
      totalCount: 0,
      errorCode: ErrorCode.UNEXPECTED_ERROR
    }

    res.status(500);
    res.end(JSON.stringify(searchResponse));
  }
});

app.get('/grocery/:id', function (req, res) {
  try {
    const getByIdResponse: GroceryGetByIdResponse = {
      product: sampleProducts.find(product => {
        return product.id == Number(req.params.id);
      }),
      errorCode: ''
    }

    res.send(JSON.stringify(getByIdResponse));
  }
  catch (ex) {
    console.log('An error has occurred when getting product by ID: ', ex);
    const getByIdResponse: GroceryGetByIdResponse = {
      errorCode: ErrorCode.UNEXPECTED_ERROR
    }

    res.status(500);
    res.end(JSON.stringify(getByIdResponse));
  }
});


app.put('/grocery/:id', function (req, res) {
  try {
    const productId = Number(req.params.id);
    const index = sampleProducts.findIndex(product => product.id === productId);

    if (index < 0) {
      const getByIdResponse: GroceryUpdateResponse = {
        errorCode: ErrorCode.UPDATE_FAILED
      }

      res.status(500);
      res.end(JSON.stringify(getByIdResponse));
    }
    else {
      sampleProducts[index] = { ...req.body, id: productId };
      const getByIdResponse: GroceryUpdateResponse = {
        product: sampleProducts[index],
        errorCode: ''
      }

      res.send(JSON.stringify(getByIdResponse));
    }
  }
  catch (ex) {
    console.log('An error has occurred when updating product: ', ex);
    const getByIdResponse: GroceryUpdateResponse = {
      errorCode: ErrorCode.UNEXPECTED_ERROR
    }

    res.status(500);
    res.end(JSON.stringify(getByIdResponse));
  }
})

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});