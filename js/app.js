'use strict';
// Jeffrey Jenkins; Code 201 Week 3 Project "Bus Mall"; Created 1-24-22

let votingAreaElem = document.getElementById('interaction-area');
let resultsButton = document.getElementById('show-results-btn');
let counterElem = document.getElementById('round-counter');
let readyStatusElem = document.getElementById('results-status');
let resultsElem = document.getElementById('results-list');

// let imgElems = votingAreaElem.getElementsByClassName();
let imgContainer = document.getElementById('img-container');

let imgElems = [];

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

let resultsReady = false;

const productArray = [];

// This array stores the indices of the currently rendered products.
let renderedProds = [];

let prodDisplayQty = 3;

let maxRounds = 25;
let counter = 0;
counterElem.innerText = counter;

/*
Constructor function and prototype methods
*/

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

Product.prototype.constructImgElem = function () {
  let imgElem = document.createElement('img');
  imgElem.setAttribute('src',this.src);
  console.log(imgElem);
  return imgElem;
};

/*
FUNCTION CALLS
*/

constructProducts(productFiles, productFileExts);

renderProducts();

votingAreaElem.addEventListener('click', handleClick);

/*
EVENT HANDLERS
*/

function handleClick(event){
  // console.log(event);
  // console.log(event.target);
  let clickedImgIndex = imgElems.indexOf(event.target);
  let productIndex = renderedProds[clickedImgIndex];
  if (counter === maxRounds){
    renderReadyStatus();
  } else {
    if (clickedImgIndex > -1){
      productArray[productIndex].votes++;
      counter++;
      counterElem.innerText = counter;
      unrenderAllProducts();
      renderProducts();
    }
  }
  // console.log(resultsReady && event.target === resultsButton);
  if (resultsReady && event.target === resultsButton){
    renderResults();
    votingAreaElem.removeEventListener('click', handleClick);
  }
}

/*
RENDER FUNCTIONS
*/

function unrenderAllProducts(){

  for (let i = 0; i < imgElems.length; i++){
    imgContainer.removeChild(imgElems[i]);
  }
}

function renderProducts() {
  for (let i = 0; i < prodDisplayQty; i++){
    let prevSet = renderedProds;
    let newProdIndex = randomProduct();
    while (renderedProds.includes(newProdIndex) || prevSet.includes(newProdIndex)){
      newProdIndex = randomProduct();
    }
    renderedProds[i] = newProdIndex;
    let newImgElem = productArray[newProdIndex].constructImgElem();
    imgContainer.appendChild(newImgElem);
    imgElems[i] = newImgElem;
    productArray[newProdIndex].markAsShown();
  }
  console.log(renderedProds);
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

function constructProducts(productNameArr, productFileExtArr) {
  for (let i = 0; i < productNameArr.length; i++) {
    let newProduct = new Product(productNameArr[i], productFileExtArr[i]);
    productArray.push(newProduct);
  }
}

function randomProduct() {
  return Math.floor(Math.random() * productArray.length);
}
