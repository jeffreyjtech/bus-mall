'use strict';
// Jeffrey Jenkins; Code 201 Week 3 Project "Bus Mall"; Created 1-24-22

let votingAreaElem = document.getElementById('container');
let showResultsButton = document.getElementById('show-results-btn');

let imgOne = document.getElementById('img-one');
let imgTwo = document.getElementById('img-two');

const productNames = [
];

const productArray = [];

let prevProduct;

let maxRounds = 25;
let counter = 0;

// The product name needs to match the product image file name
function Product(productName, fileExtension = 'jpg') {
  this.name = '';
  this.name = productName;
  this.src = `img/${productName}.${fileExtension}`;
  this.views = 0;
  this.votes = 0;
  this.shown = false;
  productArray.push(this);
}

function constructProducts(productNameArray) {
  for (let i = 0; i < productNameArray.length; i++) {
    if(i === 0){
      new Product(productNameArray[i], 'png');
    } else{
      new Product(productNameArray[i]);
    }
  }
}

constructProducts(productNames);

function renderProducts() {

  console.log(productArray);

  // This sequence splices out a random product, then uses slice to pull another random product
  // With productOne spliced out, the next random product cannot be the same
  // Furthermore, productOne will be out of rotation until AFTER the next comparison is chosen
  let productOne = productArray.splice(randomProduct(), 1);
  let productTwo = productArray.slice(randomProduct());

  // This pushes the prevProduct back into rotation now that a new comparison has been chosen
  // The if statement condition prevents prevProduct from being pushed in if it's undefined.
  if (prevProduct !== undefined){
    productArray.push(prevProduct);
  }

  // This is where productOne is stored while it's out of rotation
  [prevProduct] = productOne;
  console.log(prevProduct);

  imgOne.setAttribute("src",productOne[0].src);
  imgTwo.setAttribute("src",productTwo[0].src);

  console.log(productArray);
}

renderProducts();

votingAreaElem.addEventListener("click", renderProducts);

function randomProduct() {
  return Math.floor(Math.random() * productArray.length);
}
