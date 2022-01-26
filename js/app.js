'use strict';
// Jeffrey Jenkins; Code 201 Week 3 Project "Bus Mall"; Created 1-24-22

let votingAreaElem = document.getElementById('interaction-area');
let resultsButton = document.getElementById('show-results-btn');
let counterElem = document.getElementById('round-counter');
let clearStorageButton = document.getElementById('clear-storage-btn');
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
// The elements in this array for file extensions can be null for every file which is a .jpg, only index 14 is a .png
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
function Product(productName, fileExtension = 'jpg', storedViews = 0, storedVotes = 0) {
  this.name = productName;
  this.src = `img/${productName}.${fileExtension}`;
  this.views = storedViews;
  this.votes = storedVotes;
  this.shown = false;
}

Product.prototype.markAsShown = function () {
  this.shown = true;
  this.views++;
};

Product.prototype.constructListItem = function () {
  let liElem = document.createElement('li');
  if (this.shown) {
    liElem.innerText = `${this.name} was chosen ${this.votes} times and viewed ${this.views} times`;
    return liElem;
  } else {
    liElem.innerText = `${this.name} was not shown.`;
    return liElem;
  }
};

Product.prototype.constructImgElem = function () {
  let imgElem = document.createElement('img');
  imgElem.setAttribute('src', this.src);
  return imgElem;
};

/*
FUNCTION CALLS
*/

let [retrievedVotes, retrievedViews] = getUserHistory();

constructProducts(
  productFiles,
  productFileExts,
  retrievedViews,
  retrievedVotes
);

renderProducts();

votingAreaElem.addEventListener('click', handleClick);

/*
LOCAL STORAGE
*/

function storeUserHistory() {
  let stringifiedProducts = JSON.stringify(productArray);
  localStorage.setItem('userHistory', stringifiedProducts);
}

function clearStorage() {
  localStorage.removeItem('userHistory');
  console.log('Storage Cleared');
}

function getUserHistory() {
  let userHistory = localStorage.getItem('userHistory');
  // This if statement checks if the userHistory is null in order to prevent downstream errors
  if (userHistory !== null){
    userHistory = JSON.parse(userHistory);

    // Using the .map iterable method, I'm grabbing the views and votes for each retrieved object and creating parallel arrays
    // The "simpler" but less DRY alternative would be a for loop.
    let voteHistory = userHistory.map((element) => {
      return element.votes;
    });
    let viewHistory = userHistory.map((element) => {
      return element.views;
    });
    return [voteHistory, viewHistory];

  } else { // If userHistory is null it returns the expected arrays but with no contents.
    return [[],[]];
  }
}

/*
EVENT HANDLERS
*/

// All of my interactivity is handled by this one handleClick function
function handleClick(event) {
  // This first block checks if a product was clicked and therefore voted on, and if the last voting has concluded
  let clickedImgIndex = imgElems.indexOf(event.target);
  let productIndex = renderedProds[clickedImgIndex];
  if (clickedImgIndex > -1) {
    productArray[productIndex].votes++;
    if (counter === maxRounds) {
      resultsReady = true;
      renderReadyStatus();
    } else {
      counter++;
      counterElem.innerText = counter;
      unrenderAllProducts();
      renderProducts();
    }
  // This checks if View Results was clicked
  }
  if (resultsReady && event.target === resultsButton) {
    readyStatusElem.innerText = '1st bar is votes, 2nd bar is views';
    renderChart();
  }
  // This checks if Clear Storage was clicked and prompts the user to confirm storage deletion.
  if (event.target === clearStorageButton) {
    let confirmationResponse = prompt('Are you sure you want delete ALL stored results, including those from current voting session? Type \'delete\' to confirm');
    if(confirmationResponse === 'delete'){
      clearStorage();
      alert('Refresh the page to start another voting session.');
      votingAreaElem.removeEventListener('click', handleClick);
    }
  } else { // Else the normal function call occurs to store the view and vote histories
    storeUserHistory();
  }
}

/*
RENDER FUNCTIONS
*/

function unrenderAllProducts() {
  for (let i = 0; i < imgElems.length; i++) {
    imgContainer.removeChild(imgElems[i]);
  }
}

function renderProducts() {
  let prevSet = renderedProds;
  for (let i = 0; i < prodDisplayQty; i++) {
    let newProdIndex = randomProduct();
    while (renderedProds.includes(newProdIndex) || prevSet.includes(newProdIndex)) {
      newProdIndex = randomProduct();
    }
    renderedProds[i] = newProdIndex;
    let newImgElem = productArray[newProdIndex].constructImgElem();
    imgContainer.appendChild(newImgElem);
    imgElems[i] = newImgElem;
    productArray[newProdIndex].markAsShown();
  }
}

function renderReadyStatus() {
  resultsButton.setAttribute(
    'style',
    'color: black; background-color: #ddd; box-shadow: 1px 1px 3px black;'
  );
  readyStatusElem.innerText = 'Press "View Results"';
}

function renderChart() {
  let viewData = [];
  let voteData = [];
  for (let i = 0; i < productArray.length; i++) {
    viewData[i] = productArray[i].views;
    voteData[i] = productArray[i].votes;
  }
  const ctxResults = document.getElementById('results-chart').getContext('2d');
  const resultsChart = new Chart(ctxResults, { //eslint-disable-line
    type: 'bar',
    data: {
      labels: productFiles,
      datasets: [
        {
          label: '# of votes',
          data: voteData,
          indexAxis: 'y',
          backgroundColor: '#ada',
        },
        {
          label: '# of views',
          data: viewData,
          indexAxis: 'y',
        },
      ],
    },
  });
}

/*
HELPER FUNCTIONS
*/

function constructProducts(
  productNameArr,
  productFileExtArr,
  viewHistory,
  voteHistory
) {
  for (let i = 0; i < productNameArr.length; i++) {
    let newProduct = new Product(
      productNameArr[i],
      productFileExtArr[i],
      viewHistory[i],
      voteHistory[i]
    );
    productArray.push(newProduct);
  }
}

function randomProduct() {
  return Math.floor(Math.random() * productArray.length);
}
