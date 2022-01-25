'use strict';
// Jeffrey Jenkins; Code 201 Week 3 Project "Bus Mall"; Created 1-24-22

let votingAreaElem = document.getElementById('interaction-area');
let resultsButton = document.getElementById('show-results-btn');
let counterElem = document.getElementById('round-counter');
let readyStatusElem = document.getElementById('results-status');
let resultsElem = document.getElementById('results-list');

// let imgElems = votingAreaElem.getElementsByClassName();
let img1 = document.getElementById('img1');
let img2 = document.getElementById('img2');
let img3 = document.getElementById('img3');

let imgElems = [img1,img2,img3];
let renderedProducts = [];
let resultsReady = false;

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
counterElem.innerText = counter;

// The product name needs to match the product image file name
function Product(productName, fileExtension = 'jpg') {
  this.name = productName;
  this.src = `img/${productName}.${fileExtension}`;
  this.views = 0;
  this.votes = 0;
  this.shown = false;
}

Product.prototype.markAsShown = function () {
  this.shown = true;
  this.views++;
};

Product.prototype.constructListItem = function () {
  let liElem = document.createElement('li');
  if (this.shown){
    // nameElem = document.createElement('i');
    // nameElem.innerText = this.name;
    liElem.innerText = `${this.name} was chosen ${this.votes} times and viewed ${this.views} times`;
    return liElem;
  } else {
    liElem.innerText = `${this.name} was not shown.`;
    return liElem;
  }
};

function constructProducts(productNameArr, productFileExtArr) {
  for (let i = 0; i < productNameArr.length; i++) {
    let newProduct = new Product(productNameArr[i], productFileExtArr[i]);
    productArray.push(newProduct);
  }
}

constructProducts(productFiles, productFileExts);

renderProducts();

votingAreaElem.addEventListener('click', handleClick);

/*
EVENT HANDLERS
*/

function handleClick(event){
  console.log(event);
  console.log(event.target);
  let clickedImgIndex = imgElems.indexOf(event.target);
  if (counter >= maxRounds){
    renderReadyStatus();
  } else {
    if (clickedImgIndex !== -1){
      renderedProducts[clickedImgIndex].votes++;
      counter++;
      counterElem.innerText = counter;
      renderProducts(event);
    }
  }
  console.log(resultsReady && event.target === resultsButton);
  if (resultsReady && event.target === resultsButton){
    renderResults();
    votingAreaElem.removeEventListener('click', handleClick);
  }
}

/*
RENDER FUNCTIONS
*/

function renderProducts() {
  console.log(productArray);
  renderedProducts = [];

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

  renderedProducts.push(productOne, productTwo, productThree);

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

function renderResults (){
  readyStatusElem.setAttribute('style','display:none');
  for (let i = 0; i < productArray.length; i++){
    let newLiElem = productArray[i].constructListItem();
    resultsElem.appendChild(newLiElem);
  }
}

function renderReadyStatus() {
  resultsButton.setAttribute('style', 'color: black; background-color: #ddd; box-shadow: 1px 1px 3px black;');
  readyStatusElem.innerText = 'Press "View Results"';
  resultsReady = true;
}

/*
HELPER FUNCTIONS
*/

function randomProduct() {
  return Math.floor(Math.random() * productArray.length);
}
