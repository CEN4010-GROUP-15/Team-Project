function createNode(element) {
  return document.createElement(element);
}

function append(parent, el) {
  return parent.appendChild(el);
}

function goDetails(evt){
  location.href='./book_details.html?ISBN='+evt.currentTarget.book.ISBN;
}

function filterTopList(){

  var objTo = document.getElementById("grid");

  while (objTo.hasChildNodes()) {
    objTo.removeChild(objTo.lastChild);
  }

  filtered = books.sort((a,b) => {
    return (a.copies_sold < b.copies_sold) ? 1 : -1;
  });

  console.log(books)
  console.log(filtered)

  filtered = filtered.slice(0, 10)

  filtered.map(function(book) {
    var divtest = document.createElement("div");
    var button = document.createElement("button");
    button.className = "btnDetails"
    button.innerHTML = 'Details'   
    divtest.className = "col"
    divtest.innerHTML = `
      <h3>${book.name}</h3>
      <p>by ${book.author}</p>
      <br/>
      <h4>$${book.price}</h4>
      <img src="${book.cover_url}" alt="${book.name} cover page" />`; 
      button.addEventListener("click", goDetails, false);
      button.book = book;
      divtest.appendChild(button);
    objTo.appendChild(divtest);
  })

}

function filterGenre(input){
  filtered = []
  if(input === ''){
    console.log(books);
    filtered = books;
  }else{
    filtered = books.filter(book => {
      return book.genre.toLowerCase() === input.toLowerCase();
    });
  }

  var objTo = document.getElementById("grid");

  while (objTo.hasChildNodes()) {
    objTo.removeChild(objTo.lastChild);
  }

  filtered.map(function(book) {
    var divtest = document.createElement("div");
    var button = document.createElement("button");
    button.className = "btnDetails"
    button.innerHTML = 'Details'   
    divtest.className = "col"
    divtest.innerHTML = `
      <h3>${book.name}</h3>
      <p>by ${book.author}</p>
      <br/>
      <h4>$${book.price}</h4>
      <img src="${book.cover_url}" alt="${book.name} cover page" />`; 
      button.addEventListener("click", goDetails, false);
      button.book = book;
      divtest.appendChild(button);
    objTo.appendChild(divtest);
  })

}

window.onload = init;
var books = []
function init(){
  var filterButton = document.getElementById("reset");
  filterButton.addEventListener('click', function (e){
    filterGenre('');
  });
  var searchbar = document.getElementById("searchbar");
  searchbar.addEventListener("keydown", function (e) {
    if (e.key === "Enter") {  
      filterGenre(searchbar.value)
    }
  });
  var topButton = document.getElementById("top");

  topButton.addEventListener("click", filterTopList, false);
}

const url = 'https://cen4010-group15.herokuapp.com/api/books/';

fetch(url)
.then((resp) => resp.json())
.then(function(data) {
  books = data;
  console.log(books);
  return books.map(function(book) {
    
    var objTo = document.getElementById("grid");
    console.log(objTo);
    var divtest = document.createElement("div");
    var button = document.createElement("button");
    button.className = "btnDetails"
    button.innerHTML = 'Details'   
    divtest.className = "col"
    divtest.innerHTML = `
      <h3>${book.name}</h3>
      <p>by ${book.author}</p>
      <br/>
      <h4>$${book.price}</h4>
      <img src="${book.cover_url}" alt="${book.name} cover page" />`; 
      button.addEventListener("click", goDetails, false);
      button.book = book;
      divtest.appendChild(button);
    objTo.appendChild(divtest);
  })
})
.catch(function(error) {
  console.log(error);
});