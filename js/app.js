'use strict';
// Jeffrey Jenkins; Code 201 Week 3 Project "Bus Mall"; Created 1-24-22

let votingAreaElem = document.getElementById('container');
let showResultsButton = document.getElementById('show-results-btn');

let img1 = document.getElementById('img1');
let img2 = document.getElementById('img2');
let img3 = document.getElementById('img3');

const productFiles = [
  'bag',
  'banana',
  'bathroom',
  'boots',
  'breakfast',
  'bubblegum',
  'chair',
  'cthulhu',
  'dog-duck',
  'dragon',
  'pen',
  'pet-sweep',
  'scissors',
  'shark',
  'sweep',
  'tauntaun',
  'unicorn',
  'water-can',
  'wine-glass',
];
const productFileExts = [
  'jpg',
  'jpg',
  'jpg',
  'jpg',
  'jpg',
  'jpg',
  'jpg',
  'jpg',
  'jpg',
  'jpg',
  'jpg',
  'jpg',
  'jpg',
  'jpg',
  'png',
  'jpg',
  'jpg',
  'jpg',
  'jpg',
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

Product.prototype.markAsShown = function () {
  this.shown = true;
};

function constructProducts(productNameArr, productFileExtArr) {
  for (let i = 0; i < productNameArr.length; i++) {
    new Product(productNameArr[i], productFileExtArr[i]);
  }
}

constructProducts(productFiles, productFileExts);

function renderProducts() {
  console.log(productArray);

  // This sequence splices out two random product, then uses slice to pull a 3rd random product
  // With the first two spliced out in sequence, all 3 will be different
  // Furthermore, productOne will be out of rotation until AFTER the next comparison is chosen
  // This prevents the lineup from being the same set of pics twice in a row
  let [productOne] = productArray.splice(randomProduct(), 1);
  let [productTwo] = productArray.splice(randomProduct(), 1);
  let [productThree] = productArray.slice(randomProduct());

  productOne.markAsShown();
  productTwo.markAsShown();
  productThree.markAsShown();

  // Since Product Two doesn't need to be removed from rotation, it's now being pushed back into the productArray
  productArray.push(productTwo);

  // This pushes the prevProduct back into rotation now that a new comparison has been chosen
  // The if statement condition prevents prevProduct from being pushed in if this is the first round and it's undefined.
  if (prevProduct !== undefined) {
    productArray.push(prevProduct);
  }

  // This is where productOne is stored while it's out of rotation
  prevProduct = productOne;
  console.log(prevProduct);

  img1.setAttribute('src', productOne.src);
  img2.setAttribute('src', productTwo.src);
  img3.setAttribute('src', productThree.src);

  console.log(productArray);
}

renderProducts();

votingAreaElem.addEventListener('click', renderProducts);

function randomProduct() {
  return Math.floor(Math.random() * productArray.length);
}
