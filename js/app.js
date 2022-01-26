'use strict';
// Jeffrey Jenkins; Code 201 Week 3 Project "Bus Mall"; Created 1-24-22

let votingAreaElem = document.getElementById('interaction-area');
let resultsButton = document.getElementById('show-results-btn');
let counterElem = document.getElementById('round-counter');
let readyStatusElem = document.getElementById('results-status');
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
// The elements in this array for file extensions can be null for every file which is a .jpg
const productFileExts = [];

productFileExts[14] = 'png';

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
  let clickedImgIndex = imgElems.indexOf(event.target);
  let productIndex = renderedProds[clickedImgIndex];
  if (counter === maxRounds){
    renderReadyStatus();
    productArray[productIndex].votes++;
  } else {
    if (clickedImgIndex > -1){
      counter++;
      counterElem.innerText = counter;
      unrenderAllProducts();
      renderProducts();
    }
  }
  if (resultsReady && event.target === resultsButton){
    readyStatusElem.innerText = '1st bar is votes, 2nd bar is views';
    renderChart();
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


function renderReadyStatus() {
  resultsButton.setAttribute('style', 'color: black; background-color: #ddd; box-shadow: 1px 1px 3px black;');
  readyStatusElem.innerText = 'Press "View Results"';
  resultsReady = true;
}

function renderChart(){
  let viewData = [];
  let voteData = [];
  for (let i = 0; i < productArray.length; i++){
    viewData[i] = productArray[i].views;
    voteData[i] = productArray[i].votes;
  }
  const ctxResults = document.getElementById('results-chart').getContext('2d');
  const resultsChart = new Chart(ctxResults , { //eslint-disable-line
    type: 'bar',
    data: {
      labels: productFiles,
      datasets: [{
        label:'# of votes',
        data:voteData,
        indexAxis: 'y',
        backgroundColor: '#ada'
      },
      {
        label:'# of views',
        data:viewData,
        indexAxis: 'y',
      }]
    }
  });
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
